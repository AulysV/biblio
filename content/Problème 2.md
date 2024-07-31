# Problème :

x personnes souhaitent remplir les binômes vides de khôlles, des groupes 1 et 7. Problème : il faut trouver un moyen équitable de répartir des x personnes entre les khôlles, en fonction de leurs préférences.

Tout fonctionne parfaitement avec la solution d'Emre détaillée ci-dessous, mais la nécessité de vouloir s'échapper de la médiocrité simple prend le dessus pour Kévin et moi-même.

## Ébauches de solutions :

1) Emre : propose de faire un système de points : +1 à chaque khôlle faite, et priorité aux personnes qui ont le moins de points. Si deux personnes ont le même nombre de points, ordre alphabétique (éventuellement inversé)

2) Aulys : https://aulysv.github.io/kholles/ : version largement améliorée mais plus complexe du système d'Emre. A l'instar des exos de DS, j'aime faire des choses compliquées pour rien, souvent inutiles voire fausse.
   
   Pour faire court : 
   
   $f : \mathbb{N} \times [1, 15] \longrightarrow \mathbb{R}$
   
    $f : (n, s) \longmapsto \sum_{i=0}^{s} \left(e^{\frac{2n-5}{10}} - e^{\frac{-5}{10}}\right)$
   
    Avec : 
   
   - $n$ le nombre de khôlles faites au moment du calcul
   
   - $s$ : la s-ième semaine
     
     (le 2, le 5 et le 10 correspondent à des paramètres : le nombre de khôlles par semaine, et le nombre de candidtats, ...)

3) Bryan : à partir du système de points de Emre : simplement, tirer au sort si même nombre de points. 

```python
import random

A = "Alice"
B = "Bob"

# A = str(input("Qui est le premier combattant ? ")
# A = str(input("Qui est le second combattant ? ")

points_A = int(input(f"Points de {A}: "))
points_B = int(input(f"Points de {B} : "))

def kipass(x, y):
    if x > y:
        print(f"{B} passe en kholle.")
    elif y > x:
        print(f"{A} passe en khôlle.")
    else:
        # Si les points sont égaux, random :
        print(f"{random.choice([A, B])} passe en khôlle.")

kipass(points_A, points_B)
```

## Position d'équilibre astable :

Nous nous sommes mis d'accord pour crééer un Google Sheets d'après l'idée d'Emre : 

|                            | Maths | Physique | Anglais | Français |
| -------------------------- | ----- | -------- | ------- | -------- |
| Emre Demir                 | 0     | 0        | 0       | 0        |
| Lino Fronuis               | 0     | 0        | 0       | 0        |
| Alina Kaddour              | 0     | 0        | 0       | 0        |
| Kévin Orduluoglu           | 0     | 0        | 0       | 0        |
| Bryan Reginold Pirapakaran | 0     | 0        | 0       | 0        |
| Aulys Vinay                | 0     | 0        | 0       | 0        |

Les points seraient rajoutés à la main, pour chaque khôlle faite. 
Problèmes : 

- Les khôlles de français ou d'anglais ne devraient pas compter autant qu'une khôlle de maths ou de physique

- Le nombre de point sera souvent égal entre deux personnes, ce qui obligera à recourir assez souvent à l'aléatoire.

- Il est préférable, d'après Alina, de faire apparaitre les dates de khôlles pour éviter la fraude.

#### Solution partielle d'Aulys :

|                  | Semaine 1 | Semaine 2 | Semaine 3 | Semaine 4 | Semaine 5 | Semaine 6 | Semaine 7 | Semaine 8 | Semaine 9 | Semaine 10 | Semaine 11 | Semaine 12 | Semaine 13 | Semaine 14 | Semaine 15 | Points |
| ---------------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ------ |
| Emre Demir       | Maths     | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>       | <br>       | <br>       | <br>       | <br>       | <br>       | x      |
| Lino Fronuis     | Physique  | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>       | <br>       | <br>       | <br>       | <br>       | <br>       | x      |
| Alina Kaddour    | Maths     | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>       | <br>       | <br>       | <br>       | <br>       | <br>       | x      |
| Kévin Orduluoglu | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>       | <br>       | <br>       | <br>       | <br>       | <br>       | x      |
| Bryan Reginold   | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>       | <br>       | <br>       | <br>       | <br>       | <br>       | x      |
| Aulys Vinay      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>      | <br>       | <br>       | <br>       | <br>       | <br>       | <br>       | x      |

Dans la colonne des points : il pourrait être judiceux de rajouter une formule qui permet de crééer un score en fonction du nombre de khôlles et selon la matière. 

- Formule qui additionne simplement le nombre de mots dans une ligne, pour donner un score (idée d'Emre dopée)

- Formule d'Aulys, qui prend en compte la répartition des khôlles dans les 15 entre autres

Le score déterminera donc les personnes prioritaires.
