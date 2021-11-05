#include "minunit.h"
#include "suites.h"
#include "mock_queue.h"

int tests_run = 0;
int tests_failed = 0;

int main()
{
   mock_queue_init();
   printf("~~~~~~~~ running tests ~~~~~~~~\n\n");
   RUN_TESTS;
   printf("~~~~~~~~~ tests done ~~~~~~~~~~\n\n");

   mu_tests_finished();

   mock_queue_cleanup();
}
