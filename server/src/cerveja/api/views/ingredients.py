from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
import json
from django.http import HttpResponse
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
    model.variaveis = pyEnv.Var(model.vars, within=pyEnv.PositiveIntegers)
    model.ingComprados = pyEnv.Var(model.ingredientes, within=pyEnv.PositiveIntegers)

    model.vPreco = pyEnv.Param(model.ingredientes, initialize=lambda model, i: precos[i-1])
    model.vQuantidade = pyEnv.Param(model.vars, model.ingredientes, initialize=lambda model, i, j: quantidade[i-1][j-1])
    model.valorVenda = pyEnv.Param(model.vars, initialize=lambda model, i: retornoBom[i-1])

    def lucro(model):
        return (sum(model.variaveis[i] * model.valorVenda[i] for i in model.vars))

    model.objective = pyEnv.Objective(rule=lucro, sense=pyEnv.maximize)

    def dinheiro(model):
        return sum(model.ingComprados[i] * model.vPreco[i] for i in model.ingredientes) <= int(dindin)

    model.restricao1 = pyEnv.Constraint(rule=dinheiro)

    def restricaoProducao(model, j):
        return sum((model.variaveis[i] * model.vQuantidade[i, j]) for i in model.vars) <= model.ingComprados[j]

    model.restricao2 = pyEnv.Constraint(model.ingredientes, rule=restricaoProducao)

    def positivo(model, j):
        return (model.ingComprados[j]) >= 0

    model.restricao3 = pyEnv.Constraint(model.ingredientes, rule=positivo)


    solver = pyEnv.SolverFactory('cplex', executable='/opt/ibm/ILOG/CPLEX_Studio_Community201/cplex/bin/x86-64_linux/cplex')

    result = solver.solve(model, tee = False)

    response = {
        'producaoImperialIPA': 0,
        'producaoDoubleIPA': 0,
        'x1': 0,
        'x2': 0,
        'x3': 0,
        'y1': 0,
        'y2': 0,
        'y3': 0,
        'y4': 0,
        'y5': 0,
        'y6': 0,
        'z1': 0,
        'z2': 0,
    }

    response['producaoImperialIPA'] = model.variaveis[1]()
    response['producaoDoubleIPA'] = model.variaveis[2]()

    response['x1'] =model.ingComprados[1]()
    response['x2'] = model.ingComprados[2]()
    response['x3'] = model.ingComprados[3]()
    response['y1'] = model.ingComprados[4]()
    response['y2'] = model.ingComprados[5]()
    response['y3'] = model.ingComprados[6]()
    response['y4'] = model.ingComprados[7]()
    response['y5'] = model.ingComprados[8]()
    response['y6'] = model.ingComprados[9]()
    response['z1'] = model.ingComprados[10]()
    response['z2'] = model.ingComprados[11]()

    print(response)

    response = json.dumps(response, indent = 4)

    return HttpResponse(response, content_type='application/json; charset=utf8')