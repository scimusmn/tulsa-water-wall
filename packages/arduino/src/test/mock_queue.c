#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "mock_queue.h"

struct mock_queue_node_t;

struct mock_queue_node_t {
   struct mock_queue_node_t *next;
   void *data;
};

static struct mock_queue_node_t mock_queue_head;
static struct mock_queue_node_t *mock_queue_tail;
size_t mock_queue_length;

void mock_queue_init()
{
   mock_queue_length = 0;
   mock_queue_head.next = NULL;
   mock_queue_tail = &mock_queue_head;
}


size_t mock_queue_len() {
   return mock_queue_length;
}


void mock_queue_data(size_t size, void *data)
{
      struct mock_queue_node_t *node = malloc(sizeof(struct mock_queue_node_t));
   if (node == NULL) {
      fprintf(stderr, "WARNING: memory allocation for mock queue node failed!\n");
      return;
   }

   node->data = malloc(size);
   if (node->data == NULL) {
      fprintf(stderr, "WARNING: memory allocation of %zu bytes for mock queue data failed!\n", size);
      return;
   }

   memcpy(node->data, data, size);
   node->next = NULL;
   mock_queue_tail->next = node;
   mock_queue_tail = node;

   mock_queue_length += 1;
}


void * mock_front_data()
{
   if (mock_queue_head.next == NULL)
      return NULL;
   return mock_queue_head.next->data;
}


void mock_pop()
{
   if (mock_queue_head.next == NULL)
      return;

   if (mock_queue_head.next->data != NULL)
      free(mock_queue_head.next->data);
   struct mock_queue_node_t *headnext = mock_queue_head.next->next;
   free(mock_queue_head.next);
   mock_queue_head.next = headnext;
   if (headnext == NULL)
      // no more nodes, bring tail back to head
      mock_queue_tail = &mock_queue_head;
   mock_queue_length -= 1;
}


void mock_queue_cleanup()
{
   while(mock_queue_length != 0)
      mock_pop();
}
