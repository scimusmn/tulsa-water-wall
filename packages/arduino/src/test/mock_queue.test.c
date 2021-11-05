#include "test/minunit.h"
#include "test/mock_queue.h"

#include <stdbool.h>

mu_test mock_queue_int();
mu_test mock_queue_int_seq();
mu_test mock_queue_pop_multi();
mu_test mock_queue_clean_finish();
mu_test mock_queue_push_multidata();


void mock_queue_tests()
{
   mu_run_test("push and pop integer to mock queue", mock_queue_int);
   mu_run_test("push and pop integer sequence", mock_queue_int_seq);
   mu_run_test("pop multiple times with empty queue", mock_queue_pop_multi);
   mu_run_test("clean up mock queue", mock_queue_clean_finish);
   mu_run_test("push and pop multiple data types", mock_queue_push_multidata);
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

mu_test mock_queue_int()
{
   mock_queue(int, 5);
   mu_assert_unequal(mock_queue_len(), 0);
   mu_assert_equal(mock_front(int), 5);

   mock_pop();

   mu_assert_equal(mock_queue_len(), 0);

   return 0;
}


mu_test mock_queue_int_seq()
{
   mock_queue(int, 2);
   mock_queue(int, 1);
   mock_queue(int, 3);
   mock_queue(int, 4);

   mu_assert_unequal(mock_queue_len(), 0);
   mu_assert_equal(mock_queue_len(), 4);
   mu_assert_equal(mock_front(int), 2);

   mock_pop();

   mu_assert_unequal(mock_queue_len(), 0);
   mu_assert_equal(mock_queue_len(), 3);
   mu_assert_equal(mock_front(int), 1);

   mock_pop();

   mu_assert_unequal(mock_queue_len(), 0);
   mu_assert_equal(mock_queue_len(), 2);
   mu_assert_equal(mock_front(int), 3);

   mock_pop();

   mu_assert_unequal(mock_queue_len(), 0);
   mu_assert_equal(mock_queue_len(), 1);
   mu_assert_equal(mock_front(int), 4);

   mock_pop();

   mu_assert_equal(mock_queue_len(), 0);

   return 0;
}


mu_test mock_queue_pop_multi()
{
   mu_assert_equal(mock_queue_len(), 0);

   mock_pop();
   mock_pop();
   mock_pop();

   mu_assert_equal(mock_queue_len(), 0);
   return 0;
}


mu_test mock_queue_clean_finish()
{
   mu_assert_equal(mock_queue_len(), 0);

   mock_queue(int, 5);
   mock_queue(int, 5);
   mock_queue(int, 5);

   mu_assert_equal(mock_queue_len(), 3);

   mock_queue_cleanup();

   mu_assert_equal(mock_queue_len(), 0);

   return 0;
}


mu_test mock_queue_push_multidata()
{
   mock_queue_cleanup();
   mu_assert_equal(mock_queue_len(), 0);

   mock_queue(const char *, "hello, world!");
   mock_queue(bool, true);
   mock_queue(float, 4.20f);

   mu_assert_equal(mock_queue_len(), 3);

   mu_assert_streq(mock_front(const char *), "hello, world!");
   mock_pop();
   mu_assert_equal(mock_front(bool), true);
   mock_pop();
   mu_assert_equal(mock_front(float), 4.20f);
   mock_pop();

   mu_assert_equal(mock_queue_len(), 0);
   return 0;
}
