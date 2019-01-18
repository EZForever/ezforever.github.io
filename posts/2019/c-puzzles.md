# [翻译] C Puzzles - 一些有趣的C语言问题
[主页](#)

大部分内容来自[这里](http://www.gowrikumar.com/c/index.php)，作者为Gowri Kumar，以CC BY-SA 3.0协议发布。除了翻译之外，本文对问题进行了重新排序，删除了一些过老无法复现的问题并增加了其它几个有趣的问题。

---
**1** 下面的程序作用是遍历数组、显示每个元素的值。但是运行结果不是这样。
```C
#include <stdio.h>

#define TOTAL_ELEMENTS (sizeof(array) / sizeof(array[0]))
int array[] = {23, 34, 12, 17, 204, 99, 16};

int main() {
  int d;
  for(d = -1; d < (TOTAL_ELEMENTS - 1); d++)
    printf("%d\n", array[d + 1]);
  return 0;
}
```
问题出在哪里？  
*提示：`sizeof`运算符、有无符号整型比较时的转换*

---
**2** 我感觉下面的程序挺完美的，但是编译的时候，我发现了一个傻*的错误。在不把代码拿去编译的前提下，找到错误所在。
```C
#include <stdio.h>

void Print_Prime() {
  printf("Yay! Optimus Prime from Transformers!\n");
}

void Print_Terminator() {
  printf("Yay! Terminator beats SkyNet!\n");
}

void Print_R2-D2() {
  printf("Yay! R2-D2 from Star Wars!\n");
}

int main() {
  int num;
  printf("Which is your favorite robot (1-3): ");
  scanf("%d", &num);
  switch(num) {
    case 1: Print_Prime(); break;
    case 2: Print_Terminator(); break;
    case 3: Print_R2-D2(); break;
    default: printf("Hmm! Only 1-3 :-)\n"); break;
  }
  return 0;
}
```
*提示：标识符命名规则*

---
**3** 下面的程序会输出什么？为什么？
```C
#include <stdio.h>

int main() {
  int i = 1;
  do {
    printf("%d\n", i);
    i++;
    if(i < 15) continue;
  } while(0);
  return 0;
}
```
*提示：`continue`语句真正的作用是什么？*

---
**4**
```C
#include <stdio.h>
#define f(a, b) a##b
#define g(a) #a
#define h(a) g(a)

int main() {
  printf("%s\n", h(f(1, 2)));
  printf("%s\n", g(f(1, 2)));
  return 0;
}
```
如果只看源码，你可能会认为程序的两行输出是一样的。但是运行程序的结果是：
```
12
f(1, 2)
```
为什么？  
*提示：含有`#`和`##`的宏的展开方式（网上资料较少）*

---
**5**
```C
#include <stdio.h>

int main() {
  int a = 10;
  switch(a) {
    case '1': printf("One\n"); break;
    case '2': printf("Two\n"); break;
    defalut: printf("None\n");
  }
  return 0;
}
```
如果你说这个程序运行结果是`None`，我会说你大错特错了。

---
**6** 这个函数用来计算一个整数（的二进制形式）中1的位数。
```
输入  二进制    输出
0     00000000  0
5     00000101  2
7     00000111  3
```
```C
int CountBits(unsigned int x) {
  static unsigned int mask[] = {
    0x55555555, 0x33333333, 0x0f0f0f0f,
    0x00ff00ff, 0x0000ffff
  };
  int i;
  int shift; /* Number of positions to shift to right */
  for(i = 0, shift = 1; i < 5; i++, shift *= 2)
    x = (x & mask[i]) + ((x >> shift) & mask[i]);
  return x;
}
```
试着找出背后的逻辑。

---
**7** 下面程序的输出是什么？为什么？（说是`f is 1.0`的，再好好想想）
```C
#include <stdio.h>

int main() {
  float f = 0.0f;
  int i;
  for(i = 0; i < 10; i++)
    f += 0.1f;
  if(f == 1.0f)
    printf("f is 1.0\n");
  else
    printf("f is NOT 1.0\n");
  return 0;
}
```

---
**8** 我认为这个代码完全合法（在学过逗号表达式之后），但是有点小问题，你能找出来吗？
```C
#include <stdio.h>

int main() {
  int a = 1, 2;
  printf("a = %d\n", a);
  return 0;
}
```

---
**9**
```C
void duff(register char *to, register char *from, register int count) {
  register int n = (count + 7) / 8;
  switch(count % 8) {
    do {
    case 0: *to++ = *from++;
    case 7: *to++ = *from++;
    case 6: *to++ = *from++;
    case 5: *to++ = *from++;
    case 4: *to++ = *from++;
    case 3: *to++ = *from++;
    case 2: *to++ = *from++;
    case 1: *to++ = *from++;
    } while(--n > 0);
  }
}
```
这是合法的C代码吗？如果是的话，它能做什么？为什么有人会这么写代码？

---
**10** 这是`CountBits`函数的另一个实现。验证它是否正确（怎么验证？），如果正确的话，找出其中的逻辑。
```C
int CountBits(unsigned int x) {
  int count = 0;
  while(x) {
    count++;
    x = x & (x = 1);
  }
  return count;
}
```

---
*TODO*