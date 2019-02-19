# [翻译] C Puzzles - 一些有趣的C语言问题
[主页](#)

[第1-20题](#posts/2019/c-puzzles.md)

---
**21** 下面程序的输出是什么？
```C
#include <stdio.h>
#include <stdlib.h>

#define SIZEOF(arr) (sizeof(arr) / sizeof(arr[0]))
#define PrintInt(expr) printf("%s:%d\n", #expr, (expr))

int main() {
  /* The powers of 10 */
  int pot[] = {
    0001,
    0010,
    0100,
    1000
  };
  int i;

  for(i=0; i<SIZEOF(pot); i++)
    PrintInt(pot[i]);
  return 0;
}
```

---
**22** 下面的程序用[更相减损术](https://baike.baidu.com/item/更相减损术/449183)实现了求两个数的**最大公约数（GCD）**。解释这个实现的逻辑，思考有没有什么改进的空间。
另外，`scanf()`返回什么？
```C
#include <stdio.h>

int gcd(int u, int v) {
  int t = 0;
  while(v > 0) {
    if(u > v) {
      t = u;
      u = v;
      v = t;
    }
    v = v - u;
  }
  return u;
}

int main() {
  int x,y;
  printf("Enter x y to find their gcd:");
  while(scanf("%d%d", &x, &y) != EOF) {
    if(x >0 && y>0)
      printf("%d %d %d\n",x,y,gcd(x,y));
    printf("Enter x y to find their gcd:");
  }
  printf("\n");
  return 0;
}
```
顺便实现一个类似的函数，用于求**4个数的最大公约数**。

---
**23** 下面的程序会输出什么？（不是10！）
```C
#include <stdio.h>

#define PrintInt(expr) printf("%s: %d\n", #expr, (expr))

int main() {
  int y = 100;
  int *p;
  p = malloc(sizeof(int));
  *p = 10;
  y = y/*p; /*dividing y by *p */;
  PrintInt(y);
  return 0;
}
```

---
**24** 这个简单的程序读入一个整数并输出，但是工作并不正常。问题（们）出在哪？
```C
#include <stdio.h>

int main() {
  int n;
  printf("Enter a number:\n");
  scanf("%d\n",n);

  printf("You entered %d\n",n);
  return 0;
}
```

---
**25** 这个程序（试图）用位运算的方式求一个数乘以5的值，但是运算结果不对。解释问题所在。
```C
#include <stdio.h>

#define PrintInt(expr) printf("%s: %d\n", #expr, (expr))

int FiveTimes(int a) {
  return a << 2 + a;
}

int main() {
  int a = 1, b = 2, c = 3;
  PrintInt(FiveTimes(a));
  PrintInt(FiveTimes(b));
  PrintInt(FiveTimes(c));
  return 0;
}
```

---
**26** 这是个合法的C语言程序吗？
```C
#include <stdio.h>

#define PrintInt(expr) printf("%s: %d\n", #expr, (expr))

int max(int a, int b) {
  (a > b) ? return a : return b;
}

int main() {
  int a = 10, b = 20;
  PrintInt(FiveTimes(a));
  PrintInt(FiveTimes(b));
  PrintInt(FiveTimes(max(a, b)));
  return 0;
}
```

---
**27** 这段代码的作用是显示20个减号。但是，正如你注意到的，代码有错。
```C
#include <stdio.h>

int main() {
  int i;
  for(i = 0; i < 20; i--)
    putchar('-');
  return 0;
}
```
改错很容易，但是为了让问题有趣一点，限定**只允许修改一个字符**。已知有3种解法，看看你能不能都找到。

---
**28** 下面的程序问题在哪里？
```C
#include <stdio.h>

int main() {
  int* ptr1,ptr2;
  ptr1 = malloc(sizeof(int));
  ptr2 = ptr1;
  *ptr2 = 10;
  return 0;
}
```

---
**29** 下面的程序输出是什么？
```C
#include <stdio.h>

int main() {
  int cnt = 5, a;
  do {
    a /= cnt;
  } while(cnt--);
  printf("%d\n", a);
  return 0;
}
```

---
**30** 下面的程序会输出什么？
```C
#include <stdio.h>

int main() {
  int i = 6;
  if(((++i < 7) && ( i++ / 6)) || (++i <= 9));
  printf("%d\n", i);
  return 0;
}
```

---
**31** 下面的程序有什么bug？
```C
#include <stdio.h>
#include <stdlib.h>
#define SIZE 15

int main() {
  int *a, i;
  a = malloc(SIZE * sizeof(int));

  for(i = 0; i < SIZE; i++)
    *(a + i) = i * i;
  for(i = 0; i < SIZE; i++)
    printf("%d\n", *a++);
  free(a);
  return 0;
}
```

---
**32** 这是个合法的C程序吗？如果是的话，它的输出是什么？
```C
#include <stdio.h>

int main() {
  int a = 3, b = 5;
  printf(&a["Ya!Hello! how is this? %s\n"], &b["junk/super"]);
  printf(&a["WHAT%c%c%c  %c%c  %c !\n"], 1["this"], 2["beauty"], 0["tool"], 0["is"], 3["sensitive"], 4["CCCCCC"]);
  return 0;
}
```

---
**33** 如果用户的输入是`Life is beautiful`，这个程序会输出什么？
```C
#include <stdio.h>

int main() {
  char dummy[80];
  printf("Enter a string:\n");
  scanf("%[^a]", dummy);
  printf("%s\n", dummy);
  return 0;
}
```

---
**34** 以下是一个多次使用的偏移（offset）宏。弄清楚它想要做什么以及使用它的优势是什么。
```C
#define offsetof(a,b) ((int)(&(((a*)(0))->b)))
```

---
**35** 这是经典的不用中间变量交换整数值的宏。
```C
#define SWAP(a,b) ((a) ^= (b) ^= (a) ^= (b))
```
使用这个宏会带来什么潜在问题？

---
**36** 这个宏有什么用？
```C
#define DPRINTF(x) printf("%s:%d\n",#x,x)
```

---
**37** 假如有人要求你写一个`IAddOverflow`函数。它接受3个参数：保存结果的指针，和要相加的两个数。如果相加结果溢出了函数返回1，否则返回0。
```C
int IAddOverflow(int *result, int a, int b) {
  //...
}
```
你会怎么写这个函数？（简单来说，怎么判断两个数相加溢出了？）

---
**38** 这个宏有什么用？
```C
#define ROUNDUP(x,n) ((x+n-1)&(~(n-1)))
```

---
**39** 很多C语言课程上都有这个例子：
```C
#define isupper(c) (((c) >= 'A') && ((c) <= 'Z'))
```
但是这个宏定义有严重的问题，如果在代码当中这么使用：
```C
char c;
//...
if(isupper(c++)) {
  //...
}
```
大多数C语言库中的`isupper()`函数也是用宏实现的（在`ctypes.h`中），但是没有任何副作用。看看你的系统中`isupper()`是怎么实现的。

---
**40** 我希望你知道函数参数表中省略号（`...`）用于说明函数接受不定参数。（`printf()`的原型是什么？）那么这个定义有什么问题？
```C
int VarArguments(...) {
  //...
  return 0;
}
```

---
**41** 写一个C程序用于找出3个整数中的最小值，但**不许使用任何比较运算符**。

---
**42** `printf()`的`%n`格式符能做什么？

---
**43** 写一个C函数，用于将两个整数相加，但是不能用`+`运算符，**只能用位运算符**。（想想实现全加器的电路，用OR、AND、XOR等等。）

---
**44** 怎么使用`printf()`打印`%`字符？（`%`是用来指定格式的呀！）

---
**45** 这两个定义区别在哪？
```C
const char *p;
char* const p;
```

---
**46** `memcpy()`和`memmove()`的区别在什么地方？

---
**47** 用`printf()`打印`double`和`float`类型数据的格式符是什么？

---
**48** 写一个C程序，判断设备的字节序。

---
**49** 写一个显示`Hello World!`的C程序，但**不许使用分号**。

