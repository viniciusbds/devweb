# es-bet

Um site de apostas esportivas de jogos eletronicos, no qual possui as seguintes entidades:
 - Jogos (Counter Strike, Valorant, COD, LOL, etc..)
 - Times 
 - Partidas
 - Apostadores
 - Administradores

A ideia principal é que os `Apostadores` possam escolher `Partidas` disponíveis e realizar apostas escolhendo um `Time` como provável vencedor. Após um `Administrador` souber o resultado de um jogo, o mesmo finaliza as apostas e o sistema premia os vencedores.

A aplicação terá:
 - um CRUD e uma tela de cadastro para `Jogos`, `Times`, `Apostadores`, `Partidas` e `Administradores`.
 - uma tela para realização das apostas, onde um Apostador seleciona um Jogo, depois uma partida, escolhe um time vencedor e o quanto deseja apostar.
 - uma tela para os administradores definirem os resultados finais dos jogos, para que assim o sistema recompense os vencedores.
 - um componente específico pra mostrar a porcentagem atual de apostas no time (ou probabilidades desse time vencer) ao usuário passar o mouse por cima dele.