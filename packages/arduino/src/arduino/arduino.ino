#include <Arduino.h>
#include <base64.hpp>

#include "SerialController.h"
#include "ShiftRegisterManager.h"

smm::SerialController<16, 32, 160> serial;
ShiftRegisterManager registers;

#define LATCH_PIN 9
#define CLOCK_PIN 10
#define DATA_PIN 12
#define LINE_SIZE 15
#define N_LINES 40

#define LINE_ON 10
#define LINE_OFF 1

byte drawing[N_LINES][LINE_SIZE];
unsigned int current_line = 0;


void beginDrawing() {
   current_line = 0;
}

void decodeLine(const char* line) {
   if (current_line >= N_LINES ||
       current_line % 2) // halve the vertical resolution
      return;
   unsigned int size = decode_base64(line, drawing[current_line]);
   serial.send("decoded-bytes", (int) size);
   current_line += 1;
   serial.send("acknowledge-line");
}

void publishDrawing() {
   serial.send("rx-ready", "0");
   for (int i=0; i<N_LINES; i++) {
      registers.write(drawing[i], LINE_SIZE);
      delay(LINE_ON);
      registers.clear(LINE_SIZE);
      delay(LINE_OFF);
   }
   serial.send("rx-ready", "1");
}



void setup() {
   registers.setup(LATCH_PIN, CLOCK_PIN, DATA_PIN, LINE_SIZE);

   serial.setup();
   serial.addCallback("begin-drawing", beginDrawing);
   serial.addCallback("line", decodeLine);
   serial.addCallback("publish-drawing", publishDrawing);

   serial.send("rx-ready", "1");
}


const int ON_TIME = 0;
const int OFF_TIME = 250;
const byte line[LINE_SIZE];

void loop() {
   /*   memset(line, 0xff, LINE_SIZE);
   registers.write(line, LINE_SIZE);
   delay(ON_TIME);
   memset(line, 0x00, LINE_SIZE);
   registers.write(line, LINE_SIZE);
   delay(OFF_TIME);*/
   serial.update();

}
