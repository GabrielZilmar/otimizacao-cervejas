set ingredientes;

param preco{ingredientes} >= 0;
param dindin >= 0;
param quantidadeIngredientesImperialIPA{ingredientes} >= 0;
param quantidadeIngredientesDoubleIPA{ingredientes} >= 0;

var producaoImperialIPA >= 0 integer;
var producaoDoubleIPA >= 0 integer;
var ingComprados{ingredientes} >= 0;

maximize lucro: (594 - 218.23) * producaoImperialIPA + (528 - 155.31) * producaoDoubleIPA;

subject to dinheiro: sum{i in ingredientes} (ingComprados[i] * preco[i]) <= dindin;

subject to restricaoProducao{i in ingredientes}: (producaoImperialIPA * quantidadeIngredientesImperialIPA[i]) 
+ (producaoDoubleIPA * quantidadeIngredientesDoubleIPA[i]) <= ingComprados[i]; 
