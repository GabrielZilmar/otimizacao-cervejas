from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view
from cerveja.api.serializers.ingredients import IngredientsSerializer
from cerveja.models import Ingredients
import pyomo.environ as pyEnv

@api_view(["GET"])
def cerveja(request):
    dindin = request.query_params.get('dindin')
    precos = [float(i) for i in request.query_params.get('precos').split(",")]
    quantidadeImperialIPA = [7.5, 0.5, 0, 0.08, 0.03, 0.03, 0.03, 0, 0, 0.023, 0]
    quantidadeDoubleIPA = [4, 0, 0.2, 0, 0.013, 0, 0.04, 0.012, 0.02, 0, 0.03]
    quantidade = [quantidadeImperialIPA, quantidadeDoubleIPA]
    retornoBom = [(594 - 218.23), (528 - 155.31)]
    n = 11

    model = pyEnv.ConcreteModel()

    model.ingredientes = pyEnv.RangeSet(n)

    model.vars = pyEnv.RangeSet(2)
    model.variaveis = pyEnv.Var(model.vars)
    model.ingComprados = pyEnv.Var(model.ingredientes)

    model.vPreco = pyEnv.Param(model.ingredientes, initialize=lambda model, i: precos[i-1])
    # model.vQuantidade = pyEnv.Param(model.vars, model.ingredientes, initialize=lambda model, i: quantidadeImperialIPA[i-1])
    model.vQuantidade = pyEnv.Param(model.ingredientes, model.ingredientes, initialize=lambda model, i, j: quantidade[i-1][j-1])
    model.valorVenda = pyEnv.Param(model.vars, initialize=lambda model, i: retornoBom[i-1])

    def lucro(model):
        return (sum(model.variaveis[i] * model.retornoBom[i] for i in model.vars))

    model.objective = pyEnv.Objective(rule=lucro, sense=pyEnv.maximize)

    def dinheiro(model):
        return sum(model.ingComprados[i] * model.vPreco[i] for i in model.ingredientes) <= dindin

    model.restricao1 = pyEnv.Constraint(rule=dinheiro)

    def restricaoProducao(model, ingredientes):
        return sum((model.variaveis[i] * model.quantidade[i, ingredientes]) for i in model.vars) <= model.ingComprados[ingredientes]

    model.restricao2 = pyEnv.Constraint(model.ingredientes, rule=restricaoProducao)

    solver = pyEnv.SolverFactory('cplex', executable='/opt/ibm/ILOG/CPLEX_Studio_Community201/cplex/bin/x86-64_linux/cplex')

    result = solver.solve(model, tee = False)

    print(result.problem.lower_bound)

    return result