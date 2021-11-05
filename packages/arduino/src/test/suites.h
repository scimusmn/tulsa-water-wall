#pragma once

#include "minunit.h"

void mock_queue_tests();

#define RUN_TESTS				\
   mu_run_suite(mock_queue_tests);
