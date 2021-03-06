#pragma once

class ShiftRegisterManager {
 public:
   void setup(int latch, int clock, int data, size_t initSize) {
      latchPin = latch;
      pinMode(latchPin, OUTPUT);

      clockPin = clock;
      pinMode(clockPin, OUTPUT);

      dataPin = data;
      pinMode(dataPin, OUTPUT);

      if (initSize > 0) {
	 clear(initSize);
      }
   }

   void write(void *data, size_t size, int byteOrder = LSBFIRST) {
      byte * array = (byte *) data;
      
      digitalWrite(latchPin, 0);
      for (int i=0; i<size; i++)
	 shiftOut(dataPin, clockPin, byteOrder, array[i]);
      digitalWrite(latchPin, 1);
   }

   void clear(size_t size) {
      digitalWrite(latchPin, 0);
      for (int i=0; i<size; i++)
	 shiftOut(dataPin, clockPin, LSBFIRST, 0);
      digitalWrite(latchPin, 1);
   }

 private:
   int latchPin, clockPin, dataPin;
};
