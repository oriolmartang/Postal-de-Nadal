/*
 * =====================================================================
 *   NADAL - Oriol · Paola · Emma
 *   Firmware v8: estil millorat, títol dinàmic, WiFi amb estat clar,
 *   calendari d'Advent desbloquejable, efectes, portal captiu, mDNS.
 * =====================================================================
 *
 *   PLACA:  NodeMCU 1.0 (ESP-12E)
 *   MATRIU WS2812B 5x9: dades D1, inici a baix a la dreta
 *   BOTÓ TTP223: D2
 *   AP:     Nadal-Oriol-Paola-Emma / 12345678
 *   URL:    http://192.168.4.1  o  http://nadal.local/
 * =====================================================================
 */

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <ESP8266mDNS.h>
#include <EEPROM.h>
#include <LittleFS.h>
#include <Adafruit_NeoPixel.h>
#include <math.h>
#include <time.h>

// =====================================================================
// CONFIGURACIÓ
// =====================================================================
#define PIN_LED   D1
#define PIN_TOUCH D2
#define LED_COUNT 45
#define MATRIX_WIDTH 5
#define MATRIX_HEIGHT 9
#define TOUCH_DEBOUNCE_MS 50UL
#define TOUCH_LONG_PRESS_MS 700UL

Adafruit_NeoPixel strip(LED_COUNT, PIN_LED, NEO_GRB + NEO_KHZ800);

const char* AP_SSID = "Nadal-Oriol-Paola-Emma";
const char* AP_PASS = "12345678";

#define EEPROM_SIZE 512
#define MAGIC       0x4E414448UL   // v8

#define MAX_SLOTS 6

#define SCHEDULE_INTERVAL_MS 20000UL
#define FADE_STEP_MS         20UL
#define EFFECT_STEP_MS       40UL
#define WIFI_CONNECT_TIMEOUT 20000UL

// =====================================================================
// ESTRUCTURES
// =====================================================================
struct ScheduleSlot {
  uint8_t enabled;
  uint8_t hour, minute;
  uint8_t r, g, b;
  uint8_t bright;
  uint8_t power;
};

struct Scene {
  uint8_t r, g, b;
  uint8_t bright;
  char    name[12];
};

struct Persisted {
  uint32_t     magic;
  uint8_t      r, g, b;
  uint8_t      bright;
  uint8_t      power;
  uint8_t      effectMode;
  uint8_t      gammaEnabled;
  uint8_t      fadeEnabled;
  uint8_t      fadeSpeed;
  uint8_t      calR, calG, calB;
  char         staSSID[33];
  char         staPass[65];
  Scene        scenes[6];
  uint8_t      scheduleEnabled;
  ScheduleSlot slots[MAX_SLOTS];
  uint8_t      adventAdmin;   // mode admin per obrir caselles avançades
};

Persisted cfg;

// =====================================================================
// ESTAT
// =====================================================================
int  curR = 0, curG = 0, curB = 0;
int  tgtR = 0, tgtG = 0, tgtB = 0;
unsigned long lastFadeStep = 0;
unsigned long lastEffectStep = 0;
unsigned long textStartedAt = 0;
char displayText[25] = "NADAL 2026";
unsigned long lastMatrixStep = 0;
uint8_t matrixFrame = 0;
int8_t matrixHeads[MATRIX_WIDTH] = {0, 3, 6, 1, 4};
bool touchReading = false;
bool touchStable = false;
unsigned long touchChangedAt = 0;
unsigned long touchPressedAt = 0;
enum GameState : uint8_t { GAME_INACTIVE, GAME_SELECT_PLAYERS, GAME_PLAYING, GAME_FINISHED };
GameState gameState = GAME_INACTIVE;
uint8_t gameBoard[9] = {0};
uint8_t gameCursor = 4;
uint8_t gamePlayers = 1;
uint8_t gameCurrentPlayer = 1;
int8_t gameWinner = 0;

bool          staConnecting = false;
unsigned long staConnectStart = 0;
String        pendingSSID = "";
String        pendingPass = "";
String        lastStaError = "";
uint8_t       staAttempts = 0;

unsigned long lastScheduleCheck = 0;
bool ntpSynced = false;

uint8_t gammaTable[256];

ESP8266WebServer server(80);
DNSServer        dnsServer;
IPAddress        apIP(192, 168, 4, 1);
IPAddress        apMsk(255, 255, 255, 0);

// =====================================================================
// PÀGINA WEB
// =====================================================================


// =====================================================================
// TAULA GAMMA
// =====================================================================
void buildGammaTable(){
  for(int i = 0; i < 256; i++){
    if(cfg.gammaEnabled){
      float n = i / 255.0f;
      gammaTable[i] = (uint8_t)(pow(n, 2.2f) * 255.0f + 0.5f);
    } else {
      gammaTable[i] = (uint8_t)i;
    }
  }
}

// =====================================================================
// HSV -> RGB
// =====================================================================
void hsvToRgb8(float h, float s, float v, uint8_t &r, uint8_t &g, uint8_t &b){
  h = fmodf(h, 360.0f); if(h < 0) h += 360.0f;
  float c = v * s;
  float x = c * (1 - fabsf(fmodf(h/60.0f, 2.0f) - 1));
  float m = v - c;
  float rf, gf, bf;
  if(h < 60){ rf=c; gf=x; bf=0; }
  else if(h < 120){ rf=x; gf=c; bf=0; }
  else if(h < 180){ rf=0; gf=c; bf=x; }
  else if(h < 240){ rf=0; gf=x; bf=c; }
  else if(h < 300){ rf=x; gf=0; bf=c; }
  else { rf=c; gf=0; bf=x; }
  r = (uint8_t)constrain((int)((rf+m)*255+0.5f), 0, 255);
  g = (uint8_t)constrain((int)((gf+m)*255+0.5f), 0, 255);
  b = (uint8_t)constrain((int)((bf+m)*255+0.5f), 0, 255);
}

// =====================================================================
// COLOR SEGONS EFECTE
// =====================================================================
void computeEffectiveColor(uint8_t &r, uint8_t &g, uint8_t &b, float &brightMul){
  brightMul = 1.0f;
  unsigned long t = millis();
  switch(cfg.effectMode){
    default:
    case 0:
      r = cfg.r; g = cfg.g; b = cfg.b;
      break;
    case 1: {
      float hue = fmodf(t / 30.0f, 360.0f);
      hsvToRgb8(hue, 1.0f, 1.0f, r, g, b);
      break;
    }
    case 2: {
      r = cfg.r; g = cfg.g; b = cfg.b;
      float phase = fmodf(t, 4000.0f) / 4000.0f * 2.0f * PI;
      brightMul = 0.25f + 0.75f * (0.5f + 0.5f * sinf(phase));
      break;
    }
    case 3: {
      r = 255;
      g = (uint8_t)constrain(150 + (int)random(-25, 25), 0, 255);
      b = (uint8_t)constrain(40  + (int)random(-20, 20), 0, 255);
      brightMul = 0.7f + (random(0, 100) / 100.0f) * 0.3f;
      break;
    }
    case 4: {
      static const uint8_t pal[6][3] = {
        {255,0,0}, {0,255,0}, {0,0,255}, {255,255,0}, {255,0,255}, {0,255,255}
      };
      int idx = (t / 350) % 6;
      r = pal[idx][0]; g = pal[idx][1]; b = pal[idx][2];
      break;
    }
    case 5: {
      r = 235; g = 240; b = 255;
      brightMul = (random(0, 100) < 12) ? 1.0f : (0.35f + (random(0, 55) / 100.0f));
      break;
    }
  }
}

int computePWM(uint8_t raw, uint8_t bright, uint8_t cal){
  float f = bright / 100.0f;
  int scaled = constrain((int)(raw * f), 0, 255);
  int withCal = constrain((int)(scaled * (cal / 100.0f)), 0, 255);
  return gammaTable[withCal];
}

void computeTargets(int &r, int &g, int &b){
  if(!cfg.power){ r = g = b = 0; return; }
  uint8_t er, eg, eb; float brightMul;
  computeEffectiveColor(er, eg, eb, brightMul);
  uint8_t effBright = (uint8_t)constrain((int)(cfg.bright * brightMul), 0, 100);
  r = computePWM(er, effBright, cfg.calR);
  g = computePWM(eg, effBright, cfg.calG);
  b = computePWM(eb, effBright, cfg.calB);
}

// =====================================================================
// UPDATE
// =====================================================================
void showStripColor(int r, int g, int b){
  uint32_t color = strip.Color(r, g, b);
  for(uint16_t i = 0; i < LED_COUNT; i++){
    strip.setPixelColor(i, color);
  }
  strip.show();
}

void showDemoAnimation(){
  float phase = millis() / 18.0f;
  for(uint16_t i = 0; i < LED_COUNT; i++){
    uint8_t r, g, b;
    float hue = fmodf(phase + (i * 360.0f / LED_COUNT), 360.0f);
    hsvToRgb8(hue, 1.0f, 1.0f, r, g, b);
    strip.setPixelColor(i,
      strip.Color(computePWM(r, cfg.bright, cfg.calR),
                  computePWM(g, cfg.bright, cfg.calG),
                  computePWM(b, cfg.bright, cfg.calB)));
  }
  strip.show();
}

uint16_t matrixIndex(uint8_t row, uint8_t column){
  uint8_t columnFromRight = MATRIX_WIDTH - 1 - column;
  uint8_t ledInColumn = (columnFromRight % 2 == 0)
    ? MATRIX_HEIGHT - 1 - row
    : row;
  return columnFromRight * MATRIX_HEIGHT + ledInColumn;
}

void setMatrixPixel(int row, int column, uint8_t r, uint8_t g, uint8_t b){
  if(row < 0 || row >= MATRIX_HEIGHT || column < 0 || column >= MATRIX_WIDTH) return;
  strip.setPixelColor(matrixIndex(row, column),
    strip.Color(computePWM(r, cfg.bright, cfg.calR),
                computePWM(g, cfg.bright, cfg.calG),
                computePWM(b, cfg.bright, cfg.calB)));
}

void drawTree(uint8_t twinkle){
  static const char* tree[MATRIX_HEIGHT] = {
    "  *  ", "  G  ", " GGG ", "GGGGG", " GGG ",
    "GGGGG", " GGG ", "  G  ", "  T  "
  };
  strip.clear();
  for(uint8_t row = 0; row < MATRIX_HEIGHT; row++){
    for(uint8_t col = 0; col < MATRIX_WIDTH; col++){
      char pixel = tree[row][col];
      if(pixel == '*') setMatrixPixel(row, col, 255, 190, 20);
      else if(pixel == 'T') setMatrixPixel(row, col, 130, 65, 20);
      else if(pixel == 'G') setMatrixPixel(row, col, 0, 115, 25);
    }
  }
  static const uint8_t ornaments[][2] = {
    {2, 2}, {3, 1}, {4, 3}, {5, 0}, {5, 4}, {6, 2}
  };
  static const uint8_t colors[][3] = {
    {255, 0, 0}, {0, 80, 255}, {255, 80, 0},
    {255, 0, 120}, {255, 220, 0}, {0, 180, 255}
  };
  for(uint8_t i = 0; i < 6; i++){
    if((i + twinkle) % 3 != 0){
      setMatrixPixel(ornaments[i][0], ornaments[i][1],
                     colors[i][0], colors[i][1], colors[i][2]);
    }
  }
}

void drawBaubles(uint8_t frame){
  static const uint8_t colors[3][3] = {
    {255, 0, 0}, {0, 100, 255}, {255, 150, 0}
  };
  strip.clear();
  for(uint8_t ball = 0; ball < 3; ball++){
    int top = ball * 3;
    for(int row = 0; row < 3; row++){
      setMatrixPixel(top + row, 1, colors[ball][0] / 3,
                     colors[ball][1] / 3, colors[ball][2] / 3);
      setMatrixPixel(top + row, 3, colors[ball][0] / 3,
                     colors[ball][1] / 3, colors[ball][2] / 3);
    }
    setMatrixPixel(top, 2, colors[ball][0], colors[ball][1], colors[ball][2]);
    setMatrixPixel(top + 1, 2,
      (frame % 3 == ball) ? 255 : colors[ball][0],
      (frame % 3 == ball) ? 255 : colors[ball][1],
      (frame % 3 == ball) ? 255 : colors[ball][2]);
    setMatrixPixel(top + 2, 2, colors[ball][0], colors[ball][1], colors[ball][2]);
  }
}

uint8_t glyphRow(char ch, uint8_t row){
  static const char alphabet[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  static const uint8_t glyphs[][5] = {
    {2,5,7,5,5},{6,5,6,5,6},{3,4,4,4,3},{6,5,5,5,6},{7,4,6,4,7},
    {7,4,6,4,4},{3,4,5,5,3},{5,5,7,5,5},{7,2,2,2,7},{1,1,1,5,2},
    {5,5,6,5,5},{4,4,4,4,7},{5,7,7,5,5},{5,7,7,7,5},{2,5,5,5,2},
    {6,5,6,4,4},{2,5,5,7,3},{6,5,6,5,5},{3,4,2,1,6},{7,2,2,2,2},
    {5,5,5,5,7},{5,5,5,5,2},{5,5,7,7,5},{5,5,2,5,5},{5,5,2,2,2},
    {7,1,2,4,7},{2,5,5,5,2},{2,6,2,2,7},{6,1,2,4,7},{6,1,2,1,6},
    {5,5,7,1,1},{7,4,6,1,6},{3,4,6,5,2},{6,5,1,2,2},{2,5,7,5,2},
    {7,4,6,4,7}
  };
  for(uint8_t i = 0; i < sizeof(alphabet) - 1; i++){
    if(alphabet[i] == ch) return glyphs[i][row];
  }
  return 0;
}

void drawScrollingMessage(unsigned long elapsed){
  const char* message = "NADAL 2026";
  int messageWidth = strlen(message) * 4;
  int offset = MATRIX_WIDTH - (elapsed / 180) % (messageWidth + MATRIX_WIDTH);
  strip.clear();
  for(uint8_t ch = 0; message[ch] != '\0'; ch++){
    int left = offset + ch * 4;
    for(uint8_t row = 0; row < 5; row++){
      uint8_t bits = glyphRow(message[ch], row);
      for(uint8_t col = 0; col < 3; col++){
        if(bits & (1 << (2 - col))){
          uint8_t r, g, b;
          hsvToRgb8((elapsed / 12 + ch * 35) % 360, 1.0f, 1.0f, r, g, b);
          setMatrixPixel(row + 2, left + col, r, g, b);
        }
      }
    }
  }
}

void showDrawingDemo(){
  unsigned long elapsed = millis() % 18000UL;
  if(elapsed < 7000UL) drawTree((elapsed / 220UL) % 3);
  else if(elapsed < 10500UL) drawBaubles((elapsed / 300UL) % 3);
  else drawScrollingMessage(elapsed - 10500UL);
  strip.show();
}

void showYellowSmiley(){
  static const uint8_t face[MATRIX_HEIGHT] = {
    0b00100,
    0b01110,
    0b11111,
    0b10101,
    0b11111,
    0b10101,
    0b11011,
    0b01110,
    0b00100
  };
  strip.clear();
  for(uint8_t row = 0; row < MATRIX_HEIGHT; row++){
    for(uint8_t column = 0; column < MATRIX_WIDTH; column++){
      if(face[row] & (1 << (MATRIX_WIDTH - 1 - column))){
        setMatrixPixel(row, column, 255, 190, 0);
      }
    }
  }
  strip.show();
}

void showMatrixRain(){
  unsigned long now = millis();
  if(now - lastMatrixStep >= 150){
    lastMatrixStep = now;
    matrixFrame++;
    for(uint8_t column = 0; column < MATRIX_WIDTH; column++){
      matrixHeads[column]++;
      if(matrixHeads[column] >= MATRIX_HEIGHT + 3){
        matrixHeads[column] = -random(0, MATRIX_HEIGHT);
      }
    }
  }

  strip.clear();
  for(uint8_t column = 0; column < MATRIX_WIDTH; column++){
    for(int8_t tail = 0; tail < 4; tail++){
      int8_t row = matrixHeads[column] - tail;
      if(row < 0 || row >= MATRIX_HEIGHT) continue;

      uint8_t selector = (matrixFrame + column * 3 + row * 5) % 7;
      if(tail != 0 && selector < 3) continue;
      uint8_t green = tail == 0 ? 255 : (tail == 1 ? 105 : (tail == 2 ? 38 : 12));
      setMatrixPixel(row, column, 0, green, tail == 0 ? 20 : 0);
    }
  }
  strip.show();
}

void drawUserText(){
  unsigned long elapsed = millis() - textStartedAt;
  int textLength = strlen(displayText);
  int messageWidth = textLength * 4;
  int offset = MATRIX_WIDTH - (elapsed / 180UL) % (messageWidth + MATRIX_WIDTH);
  strip.clear();
  for(int ch = 0; ch < textLength; ch++){
    int left = offset + ch * 4;
    for(uint8_t row = 0; row < 5; row++){
      uint8_t bits = glyphRow(displayText[ch], row);
      for(uint8_t col = 0; col < 3; col++){
        if(bits & (1 << (2 - col))){
          uint8_t r, g, b;
          hsvToRgb8((elapsed / 12UL + ch * 35) % 360, 1.0f, 1.0f, r, g, b);
          setMatrixPixel(row + 2, left + col, r, g, b);
        }
      }
    }
  }
  strip.show();
}

void resetTicTacToe(){
  memset(gameBoard, 0, sizeof(gameBoard));
  gameCursor = 4;
  gameCurrentPlayer = 1;
  gameWinner = 0;
}

int8_t ticTacToeResult(const uint8_t* board){
  static const uint8_t lines[8][3] = {
    {0,1,2},{3,4,5},{6,7,8},{0,3,6},
    {1,4,7},{2,5,8},{0,4,8},{2,4,6}
  };
  for(uint8_t i = 0; i < 8; i++){
    uint8_t mark = board[lines[i][0]];
    if(mark && mark == board[lines[i][1]] && mark == board[lines[i][2]]) return mark;
  }
  for(uint8_t i = 0; i < 9; i++){
    if(!board[i]) return 0;
  }
  return 3;
}

int minimaxTicTacToe(uint8_t* board, uint8_t player, uint8_t depth){
  static uint8_t yieldCounter = 0;
  if(++yieldCounter == 0) yield();
  int8_t result = ticTacToeResult(board);
  if(result == 2) return 10 - depth;
  if(result == 1) return depth - 10;
  if(result == 3) return 0;

  int best = (player == 2) ? -100 : 100;
  for(uint8_t i = 0; i < 9; i++){
    if(board[i]) continue;
    board[i] = player;
    int score = minimaxTicTacToe(board, player == 2 ? 1 : 2, depth + 1);
    board[i] = 0;
    if(player == 2){
      if(score > best) best = score;
    } else if(score < best){
      best = score;
    }
  }
  return best;
}

void playTicTacToeAI(){
  int bestScore = -100;
  int8_t bestMove = -1;
  for(uint8_t i = 0; i < 9; i++){
    if(gameBoard[i]) continue;
    gameBoard[i] = 2;
    int score = minimaxTicTacToe(gameBoard, 1, 1);
    gameBoard[i] = 0;
    if(score > bestScore){
      bestScore = score;
      bestMove = i;
    }
  }
  if(bestMove >= 0) gameBoard[bestMove] = 2;
  gameWinner = ticTacToeResult(gameBoard);
  if(gameWinner) gameState = GAME_FINISHED;
  else gameCurrentPlayer = 1;
}

void drawTicTacToe(){
  strip.clear();
  if(gameState == GAME_SELECT_PLAYERS){
    uint8_t count = gamePlayers;
    for(uint8_t row = 0; row < 5; row++){
      uint8_t bits = glyphRow('0' + count, row);
      for(uint8_t column = 0; column < 3; column++){
        if(bits & (1 << (2 - column))){
          strip.setPixelColor(matrixIndex(row + 2, column + 1),
            strip.Color(255, 180, 0));
        }
      }
    }
    strip.show();
    return;
  }

  uint32_t gridColor = strip.Color(0, 18, 0);
  for(uint8_t row = 0; row < MATRIX_HEIGHT; row++){
    for(uint8_t column = 0; column < MATRIX_WIDTH; column++){
      if(row == 2 || row == 5 || column == 1 || column == 3){
        strip.setPixelColor(matrixIndex(row, column), gridColor);
      }
    }
  }

  uint8_t rowCenters[3] = {1, 4, 7};
  uint8_t colCenters[3] = {0, 2, 4};
  for(uint8_t cell = 0; cell < 9; cell++){
    uint8_t row = rowCenters[cell / 3];
    uint8_t column = colCenters[cell % 3];
    uint32_t color = 0;
    if(gameBoard[cell] == 1) color = strip.Color(255, 30, 0);
    else if(gameBoard[cell] == 2) color = strip.Color(0, 80, 255);
    else if(cell == gameCursor && (millis() / 250UL) % 2 == 0){
      color = strip.Color(110, 110, 110);
    }
    strip.setPixelColor(matrixIndex(row, column), color);
  }

  if(gameState == GAME_PLAYING){
    uint32_t turnColor = gameCurrentPlayer == 1
      ? strip.Color(255, 30, 0) : strip.Color(0, 80, 255);
    strip.setPixelColor(matrixIndex(0, 2), turnColor);
  } else if(gameState == GAME_FINISHED){
    if(gameWinner == 3){
      strip.setPixelColor(matrixIndex(0, 2), strip.Color(255, 180, 0));
    } else {
      uint32_t winnerColor = gameWinner == 1
        ? strip.Color(255, 30, 0) : strip.Color(0, 80, 255);
      strip.setPixelColor(matrixIndex(0, 2), winnerColor);
    }
  }
  strip.show();
}

void startTicTacToe(){
  resetTicTacToe();
  gameState = GAME_SELECT_PLAYERS;
  cfg.effectMode = 10;
  cfg.power = 1;
}

void handleTicTacToeTouch(bool longPress){
  if(gameState == GAME_SELECT_PLAYERS){
    if(longPress){
      resetTicTacToe();
      gameState = GAME_PLAYING;
    } else {
      gamePlayers = gamePlayers == 1 ? 2 : 1;
    }
  } else if(gameState == GAME_PLAYING){
    if(longPress){
      if(!gameBoard[gameCursor]){
        gameBoard[gameCursor] = gameCurrentPlayer;
        gameWinner = ticTacToeResult(gameBoard);
        if(gameWinner){
          gameState = GAME_FINISHED;
        } else if(gamePlayers == 1 && gameCurrentPlayer == 1){
          gameCurrentPlayer = 2;
          playTicTacToeAI();
        } else {
          gameCurrentPlayer = gameCurrentPlayer == 1 ? 2 : 1;
        }
      }
    } else {
      for(uint8_t step = 1; step <= 9; step++){
        uint8_t next = (gameCursor + step) % 9;
        if(!gameBoard[next]){
          gameCursor = next;
          break;
        }
      }
    }
  } else if(gameState == GAME_FINISHED){
    if(longPress) resetTicTacToe();
    else {
      gameState = GAME_SELECT_PLAYERS;
      gamePlayers = 1;
      resetTicTacToe();
    }
    if(longPress) gameState = GAME_PLAYING;
  }
  drawTicTacToe();
}

void updateTargets(){
  computeTargets(tgtR, tgtG, tgtB);
  bool bypassFade = (cfg.effectMode != 0) || !cfg.fadeEnabled;
  if(bypassFade){
    curR = tgtR; curG = tgtG; curB = tgtB;
    showStripColor(curR, curG, curB);
  }
}

void updateFade(){
  if(cfg.effectMode != 0) return;
  if(!cfg.fadeEnabled) return;
  unsigned long now = millis();
  if(now - lastFadeStep < FADE_STEP_MS) return;
  lastFadeStep = now;

  int maxStep = (cfg.fadeSpeed == 1) ? 3 : (cfg.fadeSpeed == 2) ? 6 : 12;

  auto step = [maxStep](int cur, int tgt) -> int {
    if(cur == tgt) return 0;
    int diff = tgt - cur;
    int s = diff / 8;
    if(s == 0) s = (diff > 0) ? 1 : -1;
    if(s > maxStep) s = maxStep;
    if(s < -maxStep) s = -maxStep;
    return s;
  };

  bool changed = false;
  int dR = step(curR, tgtR); if(dR){ curR += dR; changed = true; }
  int dG = step(curG, tgtG); if(dG){ curG += dG; changed = true; }
  int dB = step(curB, tgtB); if(dB){ curB += dB; changed = true; }

  if(changed){
    showStripColor(curR, curG, curB);
  }
}

void drawUserText();

void updateEffectAnimation(){
  if(cfg.effectMode == 0 || !cfg.power) return;
  unsigned long now = millis();
  if(now - lastEffectStep < EFFECT_STEP_MS) return;
  lastEffectStep = now;
  if(cfg.effectMode == 6) showDemoAnimation();
  else if(cfg.effectMode == 7) showDrawingDemo();
  else if(cfg.effectMode == 8) drawUserText();
  else if(cfg.effectMode == 10) drawTicTacToe();
  else if(cfg.effectMode == 9) showYellowSmiley();
  else if(cfg.effectMode == 11) showMatrixRain();
  else updateTargets();
}

void saveConfig();

void updateTouchButton(){
  bool reading = digitalRead(PIN_TOUCH) == HIGH;
  unsigned long now = millis();
  if(reading != touchReading){
    touchReading = reading;
    touchChangedAt = now;
  }
  if(now - touchChangedAt >= TOUCH_DEBOUNCE_MS && reading != touchStable){
    touchStable = reading;
    if(touchStable){
      touchPressedAt = now;
    } else {
      bool longPress = now - touchPressedAt >= TOUCH_LONG_PRESS_MS;
      if(cfg.effectMode == 10){
        handleTicTacToeTouch(longPress);
      } else if(!cfg.power){
        cfg.effectMode = 0;
        gameState = GAME_INACTIVE;
        cfg.r = 255; cfg.g = 255; cfg.b = 255;
        cfg.power = 1;
      } else if(cfg.effectMode == 6){
        cfg.effectMode = 0;
        gameState = GAME_INACTIVE;
        cfg.power = 0;
      } else if(cfg.effectMode != 0){
        cfg.effectMode = 0;
        gameState = GAME_INACTIVE;
        cfg.power = 0;
      } else if(cfg.r == 255 && cfg.g == 255 && cfg.b == 255){
        cfg.r = 255; cfg.g = 0; cfg.b = 0;
      } else if(cfg.r == 255 && cfg.g == 0 && cfg.b == 0){
        cfg.r = 0; cfg.g = 255; cfg.b = 0;
      } else if(cfg.r == 0 && cfg.g == 255 && cfg.b == 0){
        cfg.r = 0; cfg.g = 0; cfg.b = 255;
      } else if(cfg.r == 0 && cfg.g == 0 && cfg.b == 255){
        startTicTacToe();
      } else {
        cfg.power = 0;
      }
      if(cfg.effectMode == 10) drawTicTacToe();
      else updateTargets();
      saveConfig();
      Serial.println(!cfg.power ? "Tacte: tira apagada." :
                     cfg.effectMode == 6 ? "Tacte: demo LED." :
                     cfg.effectMode == 7 ? "Tacte: dibuixos LED." :
                     cfg.effectMode == 10 ? "Tacte: tres en ratlla." :
                     cfg.r == 255 && cfg.g == 255 && cfg.b == 255 ? "Tacte: blanc." :
                     cfg.r == 255 ? "Tacte: vermell." :
                     cfg.g == 255 ? "Tacte: verd." : "Tacte: blau.");
    }
  }
}

// =====================================================================
// EEPROM
// =====================================================================
void setDefaultConfig(){
  cfg.magic = MAGIC;
  cfg.r = 255; cfg.g = 255; cfg.b = 255;
  cfg.bright = 100;
  cfg.power = 0;
  cfg.effectMode = 0;
  cfg.gammaEnabled = 1;
  cfg.fadeEnabled = 1;
  cfg.fadeSpeed = 2;
  cfg.calR = 100; cfg.calG = 100; cfg.calB = 100;
  cfg.staSSID[0] = '\0';
  cfg.staPass[0] = '\0';
  cfg.scheduleEnabled = 0;
  cfg.adventAdmin = 0;

  const char* names[6] = {"Calid","Neutre","Fred","Festa","Nit","Lectura"};
  const uint8_t cols[6][3] = {
    {255,180,100},{255,255,255},{200,220,255},
    {255, 50,150},{ 40, 20,120},{255,230,180}
  };
  for(int i = 0; i < 6; i++){
    cfg.scenes[i].r = cols[i][0];
    cfg.scenes[i].g = cols[i][1];
    cfg.scenes[i].b = cols[i][2];
    cfg.scenes[i].bright = 100;
    strncpy(cfg.scenes[i].name, names[i], sizeof(cfg.scenes[i].name) - 1);
    cfg.scenes[i].name[sizeof(cfg.scenes[i].name) - 1] = '\0';
  }

  const uint8_t hours[6] = {7, 9, 13, 18, 22, 0};
  for(int i = 0; i < 6; i++){
    cfg.slots[i].enabled = 0;
    cfg.slots[i].hour = hours[i];
    cfg.slots[i].minute = 0;
    cfg.slots[i].r = 255;
    cfg.slots[i].g = 255;
    cfg.slots[i].b = 255;
    cfg.slots[i].bright = 100;
    cfg.slots[i].power = 1;
  }
}

void loadConfig(){
  EEPROM.get(0, cfg);
  if(cfg.magic != MAGIC){
    Serial.println("Primera arrencada: valors per defecte.");
    setDefaultConfig();
    EEPROM.put(0, cfg);
    EEPROM.commit();
  }
}

void saveConfig(){
  cfg.magic = MAGIC;
  EEPROM.put(0, cfg);
  EEPROM.commit();
}

// =====================================================================
// NTP
// =====================================================================
void startNtp(){
  configTime(3600, 0, "pool.ntp.org", "time.nist.gov");
}

bool timeIsValid(){
  time_t now = time(nullptr);
  return now > 1577836800;
}

void updateNtpState(){
  static unsigned long lastCheck = 0;
  if(millis() - lastCheck < 5000) return;
  lastCheck = millis();
  bool valid = timeIsValid();
  if(valid != ntpSynced){
    ntpSynced = valid;
    Serial.print("NTP: "); Serial.println(valid ? "OK" : "NO");
  }
}

String currentTimeString(){
  time_t now = time(nullptr);
  if(now < 1577836800) return "--:--:--";
  struct tm* tinfo = localtime(&now);
  char buf[10];
  snprintf(buf, sizeof(buf), "%02d:%02d:%02d", tinfo->tm_hour, tinfo->tm_min, tinfo->tm_sec);
  return String(buf);
}

String uptimeString(){
  unsigned long s = millis() / 1000;
  unsigned int h = s / 3600;
  unsigned int m = (s % 3600) / 60;
  unsigned int sec = s % 60;
  char buf[16];
  snprintf(buf, sizeof(buf), "%02u:%02u:%02u", h, m, sec);
  return String(buf);
}

long secondsToChristmas(){
  time_t now = time(nullptr);
  struct tm t = *localtime(&now);
  struct tm target = t;
  target.tm_mon = 11;
  target.tm_mday = 25;
  target.tm_hour = 0; target.tm_min = 0; target.tm_sec = 0;
  time_t targetEpoch = mktime(&target);
  if(targetEpoch <= now){
    target.tm_year += 1;
    targetEpoch = mktime(&target);
  }
  return (long)(targetEpoch - now);
}

int adventUnlockedDay(){
  time_t now = time(nullptr);
  struct tm* t = localtime(&now);
  int month = t->tm_mon + 1;
  int day = t->tm_mday;
  if(month == 12) return (day > 24) ? 24 : day;
  return 0;
}

// =====================================================================
// PROGRAMADOR
// =====================================================================
void checkSchedule(){
  if(!cfg.scheduleEnabled) return;
  if(!timeIsValid()) return;

  time_t now = time(nullptr);
  struct tm* t = localtime(&now);
  int nowMin = t->tm_hour * 60 + t->tm_min;

  int bestSlot = -1;
  int bestDelta = 1441;
  for(int i = 0; i < MAX_SLOTS; i++){
    if(!cfg.slots[i].enabled) continue;
    int slotMin = cfg.slots[i].hour * 60 + cfg.slots[i].minute;
    int delta = nowMin - slotMin;
    if(delta < 0) delta += 1440;
    if(delta < bestDelta){ bestDelta = delta; bestSlot = i; }
  }
  if(bestSlot < 0) return;

  ScheduleSlot &s = cfg.slots[bestSlot];
  bool changed = false;
  if(cfg.power != s.power){ cfg.power = s.power; changed = true; }
  if(s.power){
    if(cfg.r != s.r){ cfg.r = s.r; changed = true; }
    if(cfg.g != s.g){ cfg.g = s.g; changed = true; }
    if(cfg.b != s.b){ cfg.b = s.b; changed = true; }
    if(cfg.bright != s.bright){ cfg.bright = s.bright; changed = true; }
  }
  if(changed){
    if(cfg.effectMode != 0){ cfg.effectMode = 0; }
    updateTargets();
    saveConfig();
  }
}

// =====================================================================
// WIFI
// =====================================================================
void startAp(){
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAPConfig(apIP, apIP, apMsk);
  WiFi.softAP(AP_SSID, AP_PASS);
  Serial.print("AP: "); Serial.println(AP_SSID);
  Serial.print("IP: "); Serial.println(WiFi.softAPIP());
}

void startStoredSta(){
  if(strlen(cfg.staSSID) == 0) return;
  Serial.print("STA: "); Serial.println(cfg.staSSID);
  WiFi.begin(cfg.staSSID, cfg.staPass);
}

// Detecció d'error segons el codi de status del WiFi
void classifyWifiError(){
  wl_status_t st = WiFi.status();
  if(st == WL_WRONG_PASSWORD){
    lastStaError = "Contrasenya incorrecta. Torna-ho a provar.";
  } else if(st == WL_NO_SSID_AVAIL){
    lastStaError = "No s'ha trobat la xarxa. Comprova el SSID.";
  } else if(st == WL_CONNECT_FAILED){
    lastStaError = "No s'ha pogut connectar. Torna-ho a intentar.";
  } else {
    lastStaError = "Temps d'espera esgotat. Comprova la contrasenya o apropa't al router.";
  }
}

void updateStaState(){
  if(!staConnecting) return;
  if(WiFi.status() == WL_CONNECTED){
    pendingSSID.toCharArray(cfg.staSSID, sizeof(cfg.staSSID));
    pendingPass.toCharArray(cfg.staPass, sizeof(cfg.staPass));
    saveConfig();
    staConnecting = false;
    lastStaError = "";
    if(MDNS.begin("nadal")) Serial.println("mDNS: http://nadal.local/");
    startNtp();
  } else if(millis() - staConnectStart > WIFI_CONNECT_TIMEOUT){
    staConnecting = false;
    classifyWifiError();
    Serial.print("STA error: "); Serial.println(lastStaError);
  }
}

// =====================================================================
// HANDLERS
// =====================================================================
void handleScan(){
  int n = WiFi.scanNetworks();
  String json = "[";
  for(int i = 0; i < n; i++){
    if(i) json += ",";
    String ssid = WiFi.SSID(i);
    ssid.replace("\\", "\\\\"); ssid.replace("\"", "\\\"");
    bool sec = (WiFi.encryptionType(i) != ENC_TYPE_NONE);
    json += "{\"ssid\":\"" + ssid + "\",\"rssi\":" + String(WiFi.RSSI(i)) +
            ",\"secure\":" + String(sec ? "true" : "false") + "}";
  }
  json += "]";
  WiFi.scanDelete();
  server.send(200, "application/json", json);
}

void handleWifiConnect(){
  if(!server.hasArg("ssid") || !server.arg("ssid").length()){
    server.send(400, "text/plain", "Falta ssid"); return;
  }
  pendingSSID = server.arg("ssid");
  pendingPass = server.hasArg("pass") ? server.arg("pass") : "";
  lastStaError = "";
  staConnecting = true;
  staConnectStart = millis();
  staAttempts = 1;
  WiFi.disconnect(true);
  delay(100);
  WiFi.begin(pendingSSID.c_str(), pendingPass.c_str());
  server.send(200, "text/plain", "connecting");
}

void handleWifiStatus(){
  bool c = (WiFi.status() == WL_CONNECTED);
  String json = "{";
  json += "\"connected\":" + String(c ? "true" : "false") + ",";
  json += "\"connecting\":" + String(staConnecting ? "true" : "false") + ",";
  json += "\"attemptSsid\":\"" + pendingSSID + "\",";
  json += "\"ssid\":\"" + (c ? WiFi.SSID() : String("")) + "\",";
  json += "\"ip\":\"" + (c ? WiFi.localIP().toString() : String("")) + "\",";
  json += "\"rssi\":" + String(c ? WiFi.RSSI() : 0) + ",";
  json += "\"attempts\":" + String(staAttempts) + ",";
  json += "\"lastError\":\"" + lastStaError + "\"";
  json += "}";
  server.send(200, "application/json", json);
}

void handleWifiForget(){
  cfg.staSSID[0] = '\0';
  cfg.staPass[0] = '\0';
  saveConfig();
  WiFi.disconnect(false);
  pendingSSID = ""; pendingPass = ""; staConnecting = false; lastStaError = "";
  server.send(200, "text/plain", "OK");
}

void handleDebug(){
  bool c = (WiFi.status() == WL_CONNECTED);
  String json = "{";
  json += "\"ap\":{\"ssid\":\"" + String(AP_SSID) + "\",\"ip\":\"" +
          WiFi.softAPIP().toString() + "\",\"clients\":" +
          String(WiFi.softAPgetStationNum()) + "},";
  json += "\"sta\":{\"connected\":" + String(c ? "true" : "false") +
          ",\"ssid\":\"" + (c ? WiFi.SSID() : String("")) + "\",\"ip\":\"" +
          (c ? WiFi.localIP().toString() : String("")) + "\",\"rssi\":" +
          String(c ? WiFi.RSSI() : 0) + "},";
  json += "\"ntpSynced\":" + String(timeIsValid() ? "true" : "false") + ",";
  json += "\"time\":\"" + currentTimeString() + "\",";
  json += "\"uptime\":\"" + uptimeString() + "\",";
  json += "\"freeHeap\":" + String(ESP.getFreeHeap()) + ",";
  json += "\"chipId\":\"" + String(ESP.getChipId(), HEX) + "\",";
  json += "\"sdkVersion\":\"" + String(ESP.getCoreVersion()) + "\"";
  json += "}";
  server.send(200, "application/json", json);
}

void handleReboot(){
  server.send(200, "text/plain", "Rebooting");
  delay(200);
  ESP.restart();
}

void handleAdventAdmin(){
  if(server.hasArg("on")){
    cfg.adventAdmin = server.arg("on").toInt() ? 1 : 0;
    saveConfig();
  }
  server.send(200, "text/plain", "OK");
}

void handleCaptivePortal(){
  server.sendHeader("Location", "http://192.168.4.1/", true);
  server.send(302, "text/plain", "");
}

void handleWebAsset(const char* path, const char* contentType){
  File asset = LittleFS.open(path, "r");
  if(!asset){
    server.send(404, "text/plain", "Web asset not found in LittleFS");
    return;
  }
  server.streamFile(asset, contentType);
  asset.close();
}

// =====================================================================
// SERVIDOR
// =====================================================================
void setupServer(){

  server.on("/", HTTP_GET, [](){
    File page = LittleFS.open("/index.html", "r");
    if(!page){
      server.send(500, "text/plain", "Web interface not found in LittleFS");
      return;
    }
    server.streamFile(page, "text/html");
    page.close();
  });

  server.on("/style.css", HTTP_GET, [](){
    handleWebAsset("/style.css", "text/css");
  });

  server.on("/script.js", HTTP_GET, [](){
    handleWebAsset("/script.js", "application/javascript");
  });

  server.on("/api/set", HTTP_GET, [](){
    if(server.hasArg("r"))      cfg.r = constrain(server.arg("r").toInt(), 0, 255);
    if(server.hasArg("g"))      cfg.g = constrain(server.arg("g").toInt(), 0, 255);
    if(server.hasArg("b"))      cfg.b = constrain(server.arg("b").toInt(), 0, 255);
    if(server.hasArg("bright")) cfg.bright = constrain(server.arg("bright").toInt(), 0, 100);
    if(server.hasArg("power"))  cfg.power = (server.arg("power").toInt() != 0);
    updateTargets();
    saveConfig();
    server.send(200, "text/plain", "OK");
  });

  server.on("/api/toggle", HTTP_GET, [](){
    cfg.power = !cfg.power;
    updateTargets();
    saveConfig();
    server.send(200, "text/plain", cfg.power ? "ON" : "OFF");
  });

  server.on("/api/mode", HTTP_GET, [](){
    if(server.hasArg("mode")){
      uint8_t mode = constrain(server.arg("mode").toInt(), 0, 11);
      if(mode == 10){
        startTicTacToe();
        drawTicTacToe();
      } else {
        gameState = GAME_INACTIVE;
        cfg.effectMode = mode;
        if(cfg.effectMode != 0) cfg.power = 1;
        updateTargets();
      }
      saveConfig();
    }
    server.send(200, "text/plain", "OK");
  });

  server.on("/api/text", HTTP_GET, [](){
    if(!server.hasArg("value")){
      server.send(400, "text/plain", "Missing text");
      return;
    }
    String value = server.arg("value");
    value.trim();
    if(value.length() == 0 || value.length() > sizeof(displayText) - 1){
      server.send(400, "text/plain", "Text length must be 1-24 characters");
      return;
    }
    for(size_t i = 0; i < value.length(); i++){
      char ch = value[i];
      if(ch >= 'a' && ch <= 'z') value[i] = ch - ('a' - 'A');
      else if(!((ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9') || ch == ' ')){
        server.send(400, "text/plain", "Use only unaccented letters, numbers and spaces");
        return;
      }
    }
    value.toCharArray(displayText, sizeof(displayText));
    textStartedAt = millis();
    cfg.effectMode = 8;
    cfg.power = 1;
    updateTargets();
    saveConfig();
    server.send(200, "text/plain", "OK");
  });

  server.on("/api/status", HTTP_GET, [](){
    bool sta = (WiFi.status() == WL_CONNECTED);
    bool tv = timeIsValid();
    String json = "{";
    json += "\"r\":" + String(cfg.r) + ",";
    json += "\"g\":" + String(cfg.g) + ",";
    json += "\"b\":" + String(cfg.b) + ",";
    json += "\"bright\":" + String(cfg.bright) + ",";
    json += "\"power\":" + String(cfg.power ? "true" : "false") + ",";
    json += "\"mode\":" + String(cfg.effectMode) + ",";
    json += "\"time\":\"" + currentTimeString() + "\",";
    json += "\"gamma\":" + String(cfg.gammaEnabled ? "true" : "false") + ",";
    json += "\"fade\":" + String(cfg.fadeEnabled ? "true" : "false") + ",";
    json += "\"cal\":{\"r\":" + String(cfg.calR) + ",\"g\":" + String(cfg.calG) + ",\"b\":" + String(cfg.calB) + "},";
    json += "\"sta\":{\"connected\":" + String(sta ? "true" : "false") +
            ",\"ssid\":\"" + (sta ? WiFi.SSID() : String("")) + "\"},";
    json += "\"ntpSynced\":" + String(tv ? "true" : "false") + ",";
    json += "\"secToXmas\":" + String(tv ? secondsToChristmas() : -1) + ",";
    json += "\"adventDay\":" + String(tv ? adventUnlockedDay() : 0) + ",";
    json += "\"adventAdmin\":" + String(cfg.adventAdmin ? "true" : "false");
    json += "}";
    server.send(200, "application/json", json);
  });

  server.on("/api/options", HTTP_GET, [](){
    bool needRebuild = false;
    if(server.hasArg("gamma")){
      uint8_t v = server.arg("gamma").toInt();
      if(v != cfg.gammaEnabled){ cfg.gammaEnabled = v; needRebuild = true; }
    }
    if(server.hasArg("fade"))      cfg.fadeEnabled = server.arg("fade").toInt();
    if(server.hasArg("fadespeed")) cfg.fadeSpeed = constrain(server.arg("fadespeed").toInt(), 1, 3);
    if(server.hasArg("calr"))      cfg.calR = constrain(server.arg("calr").toInt(), 50, 150);
    if(server.hasArg("calg"))      cfg.calG = constrain(server.arg("calg").toInt(), 50, 150);
    if(server.hasArg("calb"))      cfg.calB = constrain(server.arg("calb").toInt(), 50, 150);
    if(needRebuild) buildGammaTable();
    updateTargets();
    saveConfig();
    server.send(200, "text/plain", "OK");
  });

  server.on("/api/scenes", HTTP_GET, [](){
    String json = "[";
    for(int i = 0; i < 6; i++){
      if(i) json += ",";
      String n = String(cfg.scenes[i].name);
      n.replace("\\", "\\\\"); n.replace("\"", "\\\"");
      json += "{\"r\":" + String(cfg.scenes[i].r) + ",\"g\":" + String(cfg.scenes[i].g) +
              ",\"b\":" + String(cfg.scenes[i].b) + ",\"bright\":" + String(cfg.scenes[i].bright) +
              ",\"name\":\"" + n + "\"}";
    }
    json += "]";
    server.send(200, "application/json", json);
  });

  server.on("/api/scene/save", HTTP_GET, [](){
    int i = server.hasArg("i") ? server.arg("i").toInt() : -1;
    if(i < 0 || i > 5){ server.send(400, "text/plain", "i invalid"); return; }
    if(server.hasArg("r")) cfg.scenes[i].r = constrain(server.arg("r").toInt(), 0, 255);
    if(server.hasArg("g")) cfg.scenes[i].g = constrain(server.arg("g").toInt(), 0, 255);
    if(server.hasArg("b")) cfg.scenes[i].b = constrain(server.arg("b").toInt(), 0, 255);
    if(server.hasArg("bright")) cfg.scenes[i].bright = constrain(server.arg("bright").toInt(), 0, 100);
    if(server.hasArg("name")){
      String n = server.arg("name");
      n.toCharArray(cfg.scenes[i].name, sizeof(cfg.scenes[i].name));
    }
    saveConfig();
    server.send(200, "text/plain", "OK");
  });

  server.on("/api/schedule", HTTP_GET, [](){
    if(server.hasArg("enable")) cfg.scheduleEnabled = server.arg("enable").toInt();
    for(int i = 0; i < MAX_SLOTS; i++){
      String p = "slot" + String(i) + "_";
      if(server.hasArg(p+"en"))     cfg.slots[i].enabled = server.arg(p+"en").toInt();
      if(server.hasArg(p+"h"))      cfg.slots[i].hour = constrain(server.arg(p+"h").toInt(), 0, 23);
      if(server.hasArg(p+"m"))      cfg.slots[i].minute = constrain(server.arg(p+"m").toInt(), 0, 59);
      if(server.hasArg(p+"r"))      cfg.slots[i].r = constrain(server.arg(p+"r").toInt(), 0, 255);
      if(server.hasArg(p+"g"))      cfg.slots[i].g = constrain(server.arg(p+"g").toInt(), 0, 255);
      if(server.hasArg(p+"b"))      cfg.slots[i].b = constrain(server.arg(p+"b").toInt(), 0, 255);
      if(server.hasArg(p+"bright")) cfg.slots[i].bright = constrain(server.arg(p+"bright").toInt(), 0, 100);
      if(server.hasArg(p+"pow"))    cfg.slots[i].power = server.arg(p+"pow").toInt();
    }
    saveConfig();
    server.send(200, "text/plain", "OK");
  });

  server.on("/api/schedule/status", HTTP_GET, [](){
    String json = "{\"enable\":" + String(cfg.scheduleEnabled ? "true" : "false") + ",\"slots\":[";
    for(int i = 0; i < MAX_SLOTS; i++){
      if(i) json += ",";
      ScheduleSlot &s = cfg.slots[i];
      json += "{\"en\":" + String(s.enabled ? "true" : "false") +
              ",\"h\":" + String(s.hour) + ",\"m\":" + String(s.minute) +
              ",\"r\":" + String(s.r) + ",\"g\":" + String(s.g) + ",\"b\":" + String(s.b) +
              ",\"bright\":" + String(s.bright) + ",\"pow\":" + String(s.power ? "true" : "false") + "}";
    }
    json += "]}";
    server.send(200, "application/json", json);
  });

  server.on("/api/advent/admin", HTTP_GET, handleAdventAdmin);

  server.on("/api/scan", HTTP_GET, handleScan);
  server.on("/api/wifi/connect", HTTP_GET, handleWifiConnect);
  server.on("/api/wifi/status", HTTP_GET, handleWifiStatus);
  server.on("/api/wifi/forget", HTTP_GET, handleWifiForget);
  server.on("/api/debug", HTTP_GET, handleDebug);
  server.on("/api/reboot", HTTP_GET, handleReboot);

  server.onNotFound(handleCaptivePortal);
  server.begin();
  Serial.println("Servidor a punt.");
}

// =====================================================================
// SETUP
// =====================================================================
void setup(){
  Serial.begin(115200);
  delay(200);
  Serial.println();
  Serial.println("=== Nadal · Oriol · Paola · Emma (v8) ===");

  randomSeed(analogRead(A0));

  pinMode(PIN_TOUCH, INPUT);
  touchReading = digitalRead(PIN_TOUCH) == HIGH;
  touchStable = touchReading;
  touchChangedAt = millis();
  strip.begin();
  strip.clear();
  strip.show();

  EEPROM.begin(EEPROM_SIZE);
  loadConfig();
  if(!LittleFS.begin()){
    Serial.println("Error: no s'ha pogut muntar LittleFS.");
  }
  if(cfg.effectMode == 10) startTicTacToe();
  buildGammaTable();

  updateTargets();
  curR = tgtR; curG = tgtG; curB = tgtB;
  showStripColor(curR, curG, curB);

  startAp();
  dnsServer.start(53, "*", apIP);
  startStoredSta();
  startNtp();
  setupServer();

  Serial.println("Llest! Obre http://192.168.4.1");
}

// =====================================================================
// LOOP
// =====================================================================
void loop(){
  dnsServer.processNextRequest();
  server.handleClient();

  updateStaState();
  updateTouchButton();
  updateFade();
  updateEffectAnimation();
  updateNtpState();

  if(WiFi.status() == WL_CONNECTED){
    MDNS.update();
  }

  unsigned long now = millis();
  if(now - lastScheduleCheck >= SCHEDULE_INTERVAL_MS){
    lastScheduleCheck = now;
    checkSchedule();
  }
}