#pragma once

#include <stdlib.h>

void mock_queue_init();
void mock_queue_cleanup();

size_t mock_queue_len();

void mock_queue_data(size_t size, void *data);
void * mock_front_data();

#define mock_queue(type, raw) do {		\
      type data = raw;				\
      mock_queue_data(sizeof(type), &data);	\
   } while(0)

#define mock_front(type) * (type *) mock_front_data()

void mock_pop();
