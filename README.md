# Postal de Nadal

Firmware PlatformIO per a una NodeMCU ESP8266 amb una matriu WS2812B de 5 × 9 LEDs i un sensor tàctil TTP223.

## Connexions

- D1: dades de la matriu WS2812B.
- D2: sortida del TTP223.
- La matriu s'inicia a baix a la dreta i serpenteja verticalment per columnes.
- Connecta el GND de la font externa dels LEDs amb el GND de la NodeMCU. No alimentis la matriu des del pin 5 V de la placa.

## Funcions

- Servidor web amb control de color, brillantor, efectes i enviament de text.
- Efectes de colors, dibuixos, cara somrient i pluja Matrix.
- Tres en ratlla per a un o dos jugadors, controlat amb tocs curts i llargs del sensor.
- La pàgina web s'emmagatzema a `data/index.html` i se serveix des de LittleFS.

## Compilar i carregar

Amb PlatformIO instal·lat:

```sh
pio run
pio run --target upload
pio run --target uploadfs
```

El darrer comandament carrega la pàgina web a LittleFS. Cal tornar-lo a executar quan canviï algun fitxer de `data/`.
