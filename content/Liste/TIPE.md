---
title: TIPE
tags:
  - analogique
  - numérique
  - électronique
---
# Résolution analogique d'équations différentielles

## MCOT :
## Ancrage au thème
Lorsqu'une solution analytique à un problème n'est pas accessible, on peut recourir au numérique. Une autre méthode de résolution peut faire gagner en temps de calcul ou en stabilité : la résolution analogique, grâce à des circuits électriques. On convertit ainsi un problème de résolution en un problème de modélisation.

## Motivations du choix
Travailler sur le calcul analogique me permet à la fois de comprendre les similarités entre l'électronique et les autres domaines de la physique, mais aussi de comprendre les raisons de la réapparition récente du calcul analogique dans les dernières recherches technologiques, comme en machine learning.

## Positionnement thématique
- **Sciences industrielles** : Électronique
- **Physique** : Micro-technologies
- **Mathématiques** : Analyse : Équations différentielles (EDO)

## Mots-clés
- **Français** : Analogique, Résolution, Équations différentielles, Numérique
- **Anglais** : Analog computing, Differential Equations, Numeric

## Bibliographie commentée

Avant la révolution numérique, les calculs physiques étaient réalisés à la main et mécaniquement (anticythère), puis électroniquement depuis la fin du XIXe (Lord Kelvin et l'intégration mécanique) [^1].
Le numérique a fini par les remplacer, pour deux raisons principales : les ordinateurs numériques font des calculs exacts, et peuvent être programmés pour réaliser une variété infinie de tâches, contrairement à l’analogique qui consiste à réaliser des calculs en se basant sur les propriétés fondamentales de la physique, régie entre autres par des équations différentielles (loi des nœuds ou lois de fonctionnement).

Cependant, l’analogique a plusieurs avantages qui le rendent particulièrement performant dans les nouvelles technologies actuelles. Les réseaux de neurones nécessitent une puissance de calcul phénoménale, et les avantages de l'analogique tels que la capacité à réaliser de nombreux calculs en parallèle sans stockage ont poussé des entreprises comme Aspinity, basées sur les travaux initiés par des chercheurs comme Hava T. Stiegelmann [^2], à se servir de ces anciennes technologies pour des applications modernes.

L'analogique possède aussi l'avantage de ne pas échantillonner le réel et de réaliser les calculs en se basant sur les propriétés physiques, ce qui peut faire gagner en temps de calcul et économiser jusqu’à un facteur 1000 en termes de coût énergétique dans des applications courantes [^3], surtout dans le contexte actuel d’impact écologique du numérique.

La résolution d'équations différentielles par méthodes analogiques est dirigée par une méthode clé décrite dans *Analog Computing* de Prof. Dr. Bernd Ulmann : la méthode d'intégrations successives [^4]. En partant d'une équation de la forme \( x'' + bx' + cx + d = f \), on isole \( x'' = f - bx' - cx - d \). On peut alors intégrer successivement pour obtenir les valeurs \( x' \) puis \( x \). Les intégrations sont effectuées par un amplificateur linéaire en configuration intégrateur, ou par un intégrateur mécanique.

Les principales limites de cette méthode élémentaire sont la difficulté de programmation, qui est élevée pour des résultats souvent moins précis que la résolution numérique. En effet, les erreurs peuvent se retrouver amplifiées, ce qui a longtemps été un frein à la méthode analogique (frein qui a été révolutionnairement levé par Edwin A. Goldberg dans les années 50) [^5].

Les autres limites de l'analogique pur, contrairement aux ordinateurs hybrides (couplant digital et analogique) ou digitaux, sont la difficulté à systématiser la résolution. Une équation simple, même linéaire ou à coefficients constants, peut nécessiter un câblage complexe. Les *ordinateurs analogiques* ont aidé à résoudre ce problème, même si programmateur d'ordinateur analogique était un métier à part entière.

## Problématique retenue
Comment résoudre des équations différentielles grâce à des méthodes analogiques et quelles en sont les limites ?

## Objectif
On propose donc :
- De comprendre les principes de base du calcul analogique et de la résolution d'équations différentielles, en résolvant des équations différentielles ordinaires.
- De comparer les résultats obtenus avec ceux de la résolution numérique.
- Proposer une systématisation de la résolution.

---

### Références
[^1]: Tides A Scientific History - David Edgar Cartwright
[^2]: Neural Networks and Analog Computation: Beyond the Turing Limit - Hava T. Siegelmann
[^3]: 12 Future and chances, Analog Computing - Prof. Dr. Bernd Ulmann
[^4]: 7.2 Kelvin’s feedback technique, Analog Computing - Prof. Dr. Bernd Ulmann
[^5]: 4.1.2 Drift stabilization, Analog Computing - Prof. Dr. Bernd Ulmann


# Travail réalisé

## Piste actuelle

Grâce à la « Kelvin's feedback technique » que j'ai décrite dans la bibliographie commentée, on peut résoudre la plupart des équations différentielles linéaires par intégrations successives. On commence traditionnellement par faire un masse−ressort amorti.

Voici un diagramme analytique associé au problème qu'on réalise généralement afin de programmer le calculateur analogique. Dans le cas du TIPE, il sert à schématiser le circuit électrique qui servira à la résolution. Ce diagramme dérangera par ailleurs certainement ceux qui se connaissent en calcul analogique. Il n'y a pas de volonté de rigueur absolue ici, seuls les éléments graphiques simplificateurs ont été retenus.

(Les boites sont scrollables horizontalement)

![Diagramme analytique du masse ressort](https://www.aulysv.fr/_app/immutable/assets/diagram.6Ru6K0L7.svg)

### Explication :

On cherche à modéliser l'équation `ÿ + α·ẏ + β·y = e`. On a donc `ÿ = -α·ẏ -β·y + e`. Un sommateur permettra de calculer `ÿ` en sommant les trois termes. Chaque terme est obtenu en intégrant successivement `ÿ`. Chaque intégration successif est pondéré par une constante : `α` et `β`. On note qu'un inverseur est nécessaire pour retrouver du `-y` en sortie de l'intégrateur.

Ce diagramme peut être converti en circuit électrique :

![Image de circuit électrique intégrateur](https://www.aulysv.fr/_app/immutable/assets/circuit.BYiVAObz.svg)

On utilise des ALI en format intégrateurs (avec des résistances en parallèle). On remarque par ailleurs la nécessité d'avoir un inverseur après l'entrée en faisant les calculs.

### Calculs :

On note `R'` les résistances de `1 MΩ`. On résonne en potentiels.

La loi des nœuds en A donne :
$$
i_{1} +i_{2} +i_{3} =i_{c} +i_{R'}
$$

On a donc l'équation suivante, qu'on note (1) :
$$
\frac{-V_{i}}{R} +\frac{V_{0}}{\beta R} +\frac{V_{x}}{\alpha R} =-C\frac{dV_{x}}{dt} -\frac{V_{x}}{R}
$$

La loi des nœuds en B donne :
$$
\frac{V_{x}}{R} =C\frac{dV_{0}}{dt} -\frac{V_{0}}{R}
$$

On isole \( V_x \) et on substitue dans (1) :
$$
V_{i} = R^{2} C^{2}\frac{d^{2} V_{0}}{dt^{2}} +\left[\frac{RC}{\alpha } +2RC\frac{R}{R'}\right]\frac{dV_{0}}{dt} +\left[\frac{1}{\beta } +\frac{R}{R'}\left(\frac{1}{\alpha } +\frac{R}{R'}\right)\right] V_{0}
$$

On considère que \( R \) est négligeable devant \( R' \), ce qui donne sous forme normalisée :
$$
\frac{d^{2} V_{0}}{dt} +\left(\frac{1}{\alpha ( RC)^{2}}\right)\frac{dV_{0}}{dt} +\frac{V_{0}}{\beta ( RC)^{2}} = \frac{V_{i}}{( RC)^{2}}
$$

On prend \( RC = 1 \) à une puissance de 10 près, ce qui donnera bien ce que l'on veut. Il suffit de modifier les coefficients pour correspondre à l'équation modélisée.


Voici les résultats pour une entrée en échelon pour le pendule-plan puis pour le circuit d'ordre 2. Les données du pendule-plan ont été prélevées d'une vidéo par un logiciel de pointage.

![Graphe du pendule plan](https://www.aulysv.fr/_app/immutable/assets/graph.GHVBapEw.svg) ![Graphe du circuit](https://www.aulysv.fr/_app/immutable/assets/graph2.DS9_i0Wq.svg)

(pas encore exporté les données du circuit, le deuxième graphe est un graphe test)

## Premières idées non abouties

Avant de cerner précisément la problématique et d'acquérir les connaissances précises, j'ai voulu explorer toutes les facettes du domaine, en particulier les méthodes de résolution mécaniques.

### Intégrateur mécanique :

Voici l'intégrateur mécanique auquel j'ai enlevé le support d'écriture afin de comprendre son fonctionnement :

![Intégrateur mécanique](https://www.aulysv.fr/_app/immutable/assets/im.BkeimqOQ.png)

Un moteur permet de fournir une vitesse de rotation constante à la plaque carrée (je n'avais pas de disque). Plus haut, un module translatable permet le traçage de la courbe dont l'intégrale est voulue. La vitesse de rotation de la roue dépend de la position de cette dernière sur le "disque" en rotation. La distance de son point d’appui avec le centre du disque, `y`, varie dans le temps. Cette distance est contrôlée à la main en haut à droite. Quand le disque tourne d’un angle infinitésimal dθ, pendant un intervalle de temps `βdτ`, l’axe de la roue tourne d’un angle `y(τ) dθ`. Pendant un intervalle de temps `[0, t]`, l’axe de la roulette tourne donc d’un angle `α ∫ y(τ) β dτ`. Le cylindre en bois transmet donc la vitesse de rotation à une vis sans fin qui permet le traçage de l’intégrale (de 0 à t) : `∫ y(τ) dτ`, à un facteur de proportionnalité près.

Pour le dire simplement, plus la roue est éloignée du centre de rotation de la plateforme, plus elle tourne vite. Une relation linéaire entre vitesse et positon une opération de dérivée, et donc d'intégration dans l'autre sens.

On obtient les résultats suivants :

![Résultats de l'intégrateur mécanique](https://www.aulysv.fr/_app/immutable/assets/mec.Bv-uWRLx.png)

L'entrée est dessinée à la main en faisant translater le module translatable : la valeur de cette translation donne les y en fonction du temps. Les x sont données par la translation d'une feuille dont la vitesse est donnée par le moteur. Cette vitesse est synchronisée à celle de la translation de la feuille de sortie. Ici, j'ai tenté d'intégrer une courbe en 1/x en essayant de coller le plus possible au graphe que j'ai tracé au préalable.

On voit bien que la sortie correspond grossièrement à du ln(x), même si on observe des erreurs. Ces erreurs sont dues à la transmission de la vitesse de rotation de la roue jusqu'à la roue et vis sans fin. Il y a souvent des accrochages qui créent un retard (ralentissement de la pente), qui est ensuite compensé quand la rotation reprend après le blocage.

On voit bien que l'intégration mécanique n'est pas très optimisée : j'abandonne donc cette piste.