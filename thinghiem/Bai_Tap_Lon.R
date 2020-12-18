sd(c(0.1,0.14,0.08))
# tdoduoc
# doclap: khoang cach tu sensor den coc nuoc da dang tan
# bien quan sat :t1(nhietdo moi truong), nhiet do that cua vat =0
expand.grid(d=c(0.5, 1.0),t1=-275, tdoduoc=-275)
library(daewr)
Fpower1(alpha = 0.05, nlev=2,nreps=3:10,Delta = 0.05,sigma=0.03)
# alpha = 0.05,beta= 1-power= 0.128
# so lan lap = 7
plan <- expand.grid(d=c(0.5, 1.0),t1=-275, tdoduoc=-275)
plan
class(plan)
library(mefa)
rep(plan,7)
exp <- rep(plan,7)
exp <- exp[sample(1:nrow(exp)),]
write.csv(exp,'exp.csv',row.names = FALSE)
kq <- read.csv('exp.csv')
kq
model <- lm(data=kq, d ~ tdoduoc +t1)
model


