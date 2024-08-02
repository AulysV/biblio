---
title: TIPE
tags:
  - analogique
  - numérique
  - électronique
---
# Intro

Avant la révolution numérique, les calculs physiques étaient réalisés à la main et mécaniquement (anticythère), puis électroniquement depuis la fin du XIXe.

Le numérique a fini par les remplacer, pour deux raisons principales : les ordinateurs numériques font des calculs exacts, et peuvent être programmés pour réaliser une variété infinie de tâches, contrairement à l’analogique qui consiste à réaliser des calculs en se basant sur les propriétés fondamentales de la physique qui est régie entre autres par des équations différentielles (loi des noeuds ou lois de fonctionnement).

Cependant, l’analogique a l'énorme avantage de ne pas échantillonner le réel et réaliser les calculs en se basant sur les propriétés de la physique peut faire gagner des facteurs 1000 en termes de rapidité et de coût énergétique, surtout si on considère l’impact écologique actuel du numérique.

Nous pouvons donc nous demander **comment il est possible résoudre une équation différentielle analogiquement**.

Les premières idées qui me sont venues à propos de ce sujet, c’est le lien fort qui existe entre la mécanique et l’électronique : les mêmes équations différentielles existent entre le masse-ressort amorti et le RLC par exemple. Donc naturellement, pourquoi ne pas résoudre le masse ressort avec un RLC, et mesurer la tension aux bornes du condensateur pour avoir une idée de l’angle en fonction du temps ? Puisqu’il ne s’agit pas des mêmes grandeurs, les coefficients de l’équation de l'oscillateur harmonique sont une des choses auxquelles il faut faire attention. Et par identification des coefficients, on peut trouver des valeurs de R, L, et C en fonction de la masse du pendule et de la raideur du ressort.

Je me suis vite rendu compte que le problème de cette approche est la nécessité d’avoir l’équation du masse-ressort. J’ai donc créé un programme python permettant d’obtenir une équation différentielle potentielle à partir d’un tableau de mesures, en testant plusieurs modèles d’équations différentielles grâce à SciPy. Le programme fonctionne pour un pendule plan : la solution en sinusoïdale amortie est détectée, et le programme me renvoie des valeurs de R, L, C qui ne fonctionnent pas.

Cette méthode, qu’on peut appeler la méthode du circuit analogue, fonctionne pour des modèles simples et linéaires, mais on se trouve rapidement limité par nos connaissances en électronique la complexité de l’équation différentielle, surtout si elle n’est pas linéaire (en induction par exemple).

Les physiciens ont donc développé la méthode d’intégrations successives. Théoriquement, elle consiste à isoler le terme de plus haut degré n, de l’intégrer n fois, puis répéter l’opération pour chaque degré de n-1 jusqu’à 1, tout en sommant à chaque fois les termes intégrés. → “schéma analytique”

Le problème de résolution d’équation différentielle se résume donc en un problème d’intégration. Mais l’intégration est assez simplement réalisable grâce à des composants électroniques comme les amplificateurs linéaires. Après avoir transformé le schéma analytique en circuit électrique, on obtient un circuit théorique suivant, en faisant attention à ajouter des résistances variables pour simuler les coefficients de l’équation.

L’avantage de cette méthode est son adaptabilité : il suffit de changer les résistances en des composants non linéaires pour avoir n’importe quel type d’équation différentielle.

Une autre méthode pour intégrer successivement, est de le faire mécaniquement. Une entrée sous forme de translation est donnée à l’intégrateur mécanique, et le déplacement de la roue sur le disque en rotation permet de donner une vitesse de rotation intégrée en sortie.

L’avantage de ces méthodes est le très faible coût énergétique. Le moteur lego est alimenté par 6 piles 1.5 volts pour une précision inexistante.

Pour conclure, il existe plusieurs méthodes pour résoudre une équation différentielle analogiquement : avec un circuit analogue, ou grâce à la méthode d’intégrations successives.

L’analogique reprend de la place de l'ingénierie surtout en traitement de signal et en machine learning, où le temps de calcul affreux le coût énergétique monstrueux sont une limite principale du numérique que l’analogique n’a pas.

# Slide

![[tipepptx.pdf]]

# Apport personnel

Le contour de l'apport personnel sera défini plus nettement après les
premières expérimentaitons qui permettrons de délimiter ce qui est
possible de ce qui ne l'est pas.

## Intégrateur mécanique

#### Travail réalisé

La première idée était celle d'un intégrateur mécanique permettant
d'explorer rapidement les limites du calcul analogique mécanique.
Malheuresement, le temps et les ressources n'ont pas été suffisants pour
parvenir jusqu'au fonctionnement complet de l'intégrateur mécanique.

Cependant, une grande partie du travail a été réalisé. Un moteur permet de
fournir une vitesse de rotation constante à la plaque carrée faisant
office de disque.  
Plus haut, un module translatable permet le traçage de la courbe dont l'intégrale
est voulue (la partie « contrôle du traçage » n'a pas encore été réalisée...").  
La vitesse de rotation de la roue dépend donc de la position de cette dernière
sur le "disque" en rotation. La distance de son point d’appui avec le centre
du disque, `y`, varie dans le temps.  
Quand le disque tourne d’un angle infinitésimal dθ, soit pendant un intervalle
de temps `βdτ`, l’axe de la roulette tourne d’un angle
`y(τ) dθ`. Pendant un intervalle de temps `[0, t]`,
l’axe de la roulette tourne donc d’un angle `α ∫ y(τ) β dτ`.  
Le cylindre en bois transmet donc la vitesse de rotation à une vis sans fin
qui permet le traçage de l’intégrale (de 0 à t) : `∫ y(τ) dτ`,
à un facteur de proportionnalité près.  
<a href="https://interstices.info/les-calculateurs-analogiques/" class="link link-hover" target="_blank" rel="noopener noreferrer">Source des calculs</a>

#### Travail restant

- Création de la partie qui controllera la courbe fournie à l'intégrateur.
- Mise en place des supports permettant le traçage (j'ai déjà relié le
  disque en rotation à des systèmes d'engrenages permettant de fournir
  d'autres tiges en rotation, dont celles nécessaires à la translation des
  supports).

![[Files/im.png]]

## Programme python

Seconde idée : réalisation d'un programme python qui prend en entrée un
tableau de valeurs : `t` et une autre variable `x` (ou
plusieurs autres variables), et qui renvoie en sortie les détails d'un circuit
électrique possédant une équation différentielle dont le résultat est analogue
aux données fournies par le fichier de données.

#### Étapes de la réalisation du programme :

J'ai commencé par travailler sur un système simple : le pendule plan
amorti.  
Une vidéo
de pendule plan a été prise durant un TP de physque. J'ai réalisé le pointage
grâce à `Tracker`, et ai exporté les données sur un fichier
texte qui contient une liste de temps sur la première colonne, et une
liste d'angles sur la deuxième.

Le programme suivant permet d'approximer la courbe par une sinusoïdale
amortie, et d'en retrouver l'équadiff correspondante.  
J'ai ensuite réalisé les calculs pour retrouver les coefficients du circuit
RLC correspondant.

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
import sympy as sp

# Lecture des données
def lecture(path):
    data = np.loadtxt(path)
    t = data[:, 0]
    theta = data[:, 1]
    return t, theta

# Modèles de foncitons
def sinus(t, A, B, C, D):
    return A * np.sin(B * t + C) + D

def cosinus(t, A, B, C, D):
    return A * np.cos(B * t + C) + D

def exponentielle(t, A, B, C):
    return A * np.exp(B * t) + C

def poly_deg_2(t, A, B, C):
    return A * t**2 + B * t + C

def poly_deg_3(t, A, B, C, D):
    return A * t**3 + B * t**2 + C * t + D

def sinus_amorti(t, A, omega, phi, gamma):
    return A * np.sin(omega * t + phi) * np.exp(-gamma * t)

# Approximation par un des modèles
def detect_and_fit_function(t, theta):
    functions = {
        'sin': sinus,
        'cos': cosinus,
        'exp': exponentielle,
        'poly2': poly_deg_2,
        'poly3': poly_deg_3,
        'sinus_amorti': sinus_amorti
    }
    
    meilleur = None
    nom_meilleur = None
    meilleurs_params = None
    meilleur_r_carré = -np.inf

    for name, func in functions.items():
        try:
            params, _ = curve_fit(func, t, theta)
            reste = theta - func(t, *params)
            ss_res = np.sum(reste**2)
            ss_tot = np.sum((theta - np.mean(theta))**2)
            r_carré = 1 - (ss_res / ss_tot)
            
            if r_carré > meilleur_r_carré:
                meilleur_r_carré = r_carré
                meilleur = func
                nom_meilleur = name
                meilleurs_params = params
        except RuntimeError:
            continue
    
    if meilleur:
        print(f"Meilleure correspondance : {nom_meilleur}")
        print(f"Coefficients : {meilleurs_params}")
        print(f"R²: {meilleur_r_carré}")
        
        return meilleur, meilleurs_params, meilleur_r_carré
    else:
        print("Aucun modèle de fonction ne correspond à la courbe des données.")
        return None, None, None

# Génération de l'équadiff
def fonction_vers_equadiff(func, params):
    t = sp.symbols('t')
    f = sp.Function('f')(t)

    if func.__name__ == 'sinus_amorti':
        A, omega, phi, gamma = params
        equadiff = sp.diff(f, t, t) + 2 * gamma * sp.diff(f, t) + omega**2 * f
    else:
        # Si la fonction n'est pas un sinus amorti (on génère une équation de base)
        equadiff = sp.diff(f, t, t) + f

    return equadiff



def circuit_analogue(func, params):
    if func.__name__ == 'sinus_amorti':
        A, omega, phi, gamma = params
        R = 2 * gamma
        L = 1 / omega**2
        C = 1 / (omega**2 * L)
        print("\nCircuit électrique équivalent :")
        print(f"Résistance (R) : {R} ohms")
        print(f"Bobine (L) : {L} henrys")
        print(f"Condensateur (C) : {C} farads")
    else:
        print("Pour l'instant, la génération du circuit est implémentée uniquement pour un sinus amorti :(")



path = "python/data.txt"

t, theta = lecture(path)

# Détection et ajustement de la fonction
func, params, r_carré = detect_and_fit_function(t, theta)

if func:
    # Génération de l'équadiff
    diff_eq = fonction_vers_equadiff(func, params)
    print("\nÉquadiff générée :")
    sp.pprint(diff_eq)

    # Déduire et imprimer le circuit analogue
    circuit_analogue(func, params)

    # Traçage de la fonction modélisée
    t_range = np.linspace(t[0], t[-1], 1000)
    theta_fit = func(t_range, *params)

    plt.plot(t, theta, '.', label='Données')
    plt.plot(t_range, theta_fit, label=f'Approximation')
    plt.xlabel('Temps')
    plt.ylabel('Theta')
    plt.legend()
    plt.title('Données et courbe aprochée')
    plt.show()
```

#### Output :

![[output.png]]

# Bibliographie

## Article principal

![[buancom.pdf]]

## Autres articles

- **1. Source:** Wikipedia
    
    - **Contenu et utilité:** Contexte historique et idées pas ou peu scientifiques. Permettra d'agrandir la bibliographie et d'avoir une vue d'ensemble du sujet.
    - **Lien(s):**
        - [Analog computer](https://en.wikipedia.org/wiki/Analog_computer)
        - [Calculateur analogique](https://fr.wikipedia.org/wiki/Calculateur_analogique)
        - [Analyseur différentiel](https://fr.wikipedia.org/wiki/Analyseur_diff%C3%A9rentiel)
        - [Differential analyser](https://en.wikipedia.org/wiki/Differential_analyser)
- **2. Source:** DPMC Genève
    
    - **Contenu et utilité:** Article un peu plus scientifiquement poussé, abordable mais comportant des notions non vues en classes (dont des ALI). Peut-être un peu spécifique.
    - **Lien(s):** [PDF](https://www.aulysv.fr/_app/immutable/assets/dpmc.D6hnSB0g.pdf)
- **3. Source:** Univ. d'Algarve
    
    - **Contenu et utilité:** Document comportant une partie mathématique plus poussée sur le sujet, mais semble plus complexe et moins général : étudie particulièrement le General Purpose Analog Computer (GPAC)
    - **Lien(s):** [PDF](https://www.aulysv.fr/_app/immutable/assets/bazar.CKnQayjT.pdf)
- **4. Source:** Univ. of Tennessee
    
    - **Contenu et utilité:** Article très vaste et général sur l'informatique analogique, fait intervenir des notions mathématiques abordables. Permettra surtout de trouver d'autres sources, car possède une bibliographie complète.
    - **Lien(s):** [PDF](https://www.aulysv.fr/_app/immutable/assets/utk.UV8GZNkB.pdf)
- **5. Source:** Note de G. Coriolis
    
    - **Contenu et utilité:** Petit paragraphe de Coriolis (de la 5e à la 9e page) sur le traçage de courbe d'équations différentielles de manière physique.
    - **Lien(s):**
        - [PDF](https://www.aulysv.fr/_app/immutable/assets/corio.DwyHfYWF.pdf)
        - [PDF (complet)](https://www.aulysv.fr/_app/immutable/assets/coriocomplet.xtNJkGsx.pdf)
- **6. Source:** interstices.info
    
    - **Contenu et utilité:** Article assez complet sur les calculateurs analogiques. Développe beaucoup le côté historique, comme beaucoup d'autres documents à ce sujet, mais aborde tout de même des notions plus scientifiques et concrètes.
    - **Lien(s):** [PDF](https://interstices.info/les-calculateurs-analogiques/)
- **7. Source:** MIT
    
    - **Contenu et utilité:** Document paraissant assez intéressant physiquement que je n'ai pas eu le temps d'étudier...
    - **Lien(s):** [Article](https://www.aulysv.fr/_app/immutable/assets/mit.DpXN-5VT.pdf)
- **8. Source:** M. Molin
    
    - **Contenu et utilité:** Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dolores laboriosam temporibus soluta impedit aut?
    - **Lien(s):** [PDF](https://www.aulysv.fr/_app/immutable/assets/buancom.CW5OIzkE.pdf)
- **9. Source:** M. Molin
    
    - **Contenu et utilité:** Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat commodi quam dolorum at voluptatem nesciunt quo excepturi, libero odio tenetur.
    - **Lien(s):** [PDF](https://www.aulysv.fr/_app/immutable/assets/hnanhycom.D-0tQ4IB.pdf)

