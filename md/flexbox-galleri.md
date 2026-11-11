# Flexbox Galleri

### Vad händer om…
Det som händer är att korten flex:1 blir overulled för att text widthen tar över. Detta gör att korten blir olika stora. Om man använder margin-right istället för gap så kommer sista kortet att ha en extra margin som gör att det inte är centrerat längre.

### Motivera & reflektera
display: flex sätts på föräldern för att det är föräldern som styr hur barnen ska placeras i sig själv. 

Justify-content används för att styra hur barnen ska placeras horisontellt medan align-items används för att styra hur barnen ska placeras vertikalt. Men riktingarna ändras ifall man ändrar flex-direction.

### Random Frågor
1. Varför flyttar align-self åt sidan här?
- För att align-self på ett barn element vars förelder har flex-direction:column så kommer align-self att styra hur barnet ska placeras horisontellt istället för vertikalt.

#### Credits: 
[Card](https://uiverse.io/EmmaxPlay/curvy-stingray-36)

