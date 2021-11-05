#pragma once

#include <stdio.h>
#include <string.h>

#define UNIT_TEST

#define STR_IMPL(x) #x
#define STR(x) STR_IMPL(x)

#define MU_INDENT "   "

/* minunit testing macros from /www.jera.com/techinfo/jtns/jtn002.html */
#define mu_assert_msg(test, message) do { if (!(test)) return message "\n" MU_INDENT " [" __FILE__ ":" STR(__LINE__) "]"; } while (0)
#define mu_assert(test) mu_assert_msg((test), "assert failed: " #test)
#define mu_assert_equal(a, b) mu_assert_msg(a == b, "'" #a "' is not equal to '" #b "'")
#define mu_assert_unequal(a, b) mu_assert_msg(a != b, "'" #a "' is equal to '" #b "'")
#define mu_assert_streq(a, b) mu_assert_msg(strcmp(a, b) == 0, "'" #a "' is not equal to '" #b "'")

#define mu_run_test(name, test) do {					\
      const char *message = test();					\
      tests_run++;							\
      if (message) {							\
	 printf(MU_INDENT "test '%s' failed: %s\n", name, message);	\
	 tests_failed++;						\
      }									\
   } while (0)
#define mu_run_suite(suite) do {					\
      int run_old = tests_run;						\
      int failed_old = tests_failed;					\
      printf("suite: " #suite "\n");					\
      suite();								\
      printf(MU_INDENT "ran %d tests, %d failed\n\n",			\
	     tests_run - run_old,					\
	     tests_failed - failed_old);				\
   } while(0)
#define mu_tests_finished() do {					\
      printf("ran %d tests, %d failed\n", tests_run, tests_failed);	\
      return tests_failed;						\
   } while(0)

#define mu_test const char *

extern int tests_run, tests_failed;
