=begin
p => q
~r || t => u
u => ~(v || w)
x && y => z
=end

r = Proposition.create(statement: "r")
t = Proposition.create(statement: "t")
u = Proposition.create(statement: "u")
v = Proposition.create(statement: "v")
w = Proposition.create(statement: "w")

d = Disjunction.create
Disjunct.create(disjunct_id: r.id, disjunction_id: d.id, truth_value: false)
Disjunct.create(disjunct_id: t.id, disjunction_id: d.id, truth_value: true)

c = Conditional.create
ConditionalAntecedentDisjunction.create(disjunction_id: d.id, conditional_id: c.id, truth_value: true)
ConditionalConsequent.create(consequent_id: u.id, conditional_id: c.id, truth_value: true)

c2 = Conditional.create
d2 = Disjunction.create
Disjunct.create(disjunction_id: d2.id, disjunct_id: v.id, truth_value: true)
Disjunct.create(disjunction_id: d2.id, disjunct_id: w.id, truth_value: true)

ConditionalAntecedent.create(antecedent_id: u.id, conditional_id: c2.id, truth_value: true)
ConditionalConsequentDisjunction.create(disjunction_id: d2.id, conditional_id: c2.id, truth_value: false) 

x = Proposition.create(statement: "x")
y = Proposition.create(statement: "y")
z = Proposition.create(statement: "z")
c3 = Conditional.create
ConditionalAntecedent.create(antecedent_id: x.id, conditional_id: c3.id, truth_value: true)
ConditionalAntecedent.create(antecedent_id: y.id, conditional_id: c3.id, truth_value: true)
ConditionalConsequent.create(consequent_id: z.id, conditional_id: c3.id, truth_value: true)
