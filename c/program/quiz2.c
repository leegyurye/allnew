#include <stdio.h>
#include "libcheckprime.h"

void main()
{
  while (1)
  {
    int n;
    printf("\ninput integer => ");
    scanf("%d", &n);
    if (n == 0) break;
    if (checkprime(n) == n)
      printf("%d is a primenumber~!! \n", n);
    else
      printf("%d is not a primenumber~!! \n", n);
  }
}
