Manual Accessiblity isseues:

Added label to input feild , button

Added Alternative text for Image

Added `aria-label` to search , reading list close , remove from reading list ,
Want to read button

Code Review :

In BookSearchComponent:- we can use ngOnDestroy hook
to unsubscibe from oberservable and prevent memory leakage

To make code better we can make use of Lazy loading
i.e dynmically load modules at run time

No need to subscribe in component , can use async pipe in template

can use change dectection strategy to OnPush---<Implemanted>

Fixed both test cases

Added failedAddToReadingList case for the reducer to deal with failure cases
