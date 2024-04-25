interface IPlayer {
    id: number;
    name: string;
    score: number;
}
  
class Player {
    player : IPlayer[];
    constructor(){
        let data = localStorage.getItem('player');
        if(data){
            this.player = JSON.parse(data);
        }else{
            this.player = [];
        }
    }
    renderPlayer():void{
        let data = localStorage.getItem('player');
        if(data){
            this.player = JSON.parse(data);
        }else{
            this.player = [];
        }
        const tbody = document.getElementById('tbody');
        if(tbody){
            tbody.innerHTML = '';
            this.player.forEach((player) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <tr>
                <td>
                   <div class="left">
                    <div>
                        <i onclick="dltPlayer(${player.id})" id="delete" class="fa-solid fa-x"></i>
                        <i  id="crown" class="fa-solid fa-crown"></i>
                    </div>
                    <div>
                        <span>${player.name}</span>
                    </div>
                   </div>
                    
                   <div class="right">
                    <button class="opt"><i onclick="updatePlayer2(${player.id})" id="minus" class="fa-solid fa-minus"></i></button>
                    <span>${player.score}</span>
                    <button class="opt"><i onclick="updatePlayer1(${player.id})" id="add" class="fa-solid fa-add"></i></button>
                   </div>
                </td>
                
            </tr>
                `;
                tbody.appendChild(tr);
            });
        }
    }
   
    createPlayer(){
        let name:string = (<HTMLInputElement>document.getElementById('a')).value;
        let score:number = 0;
        let player:IPlayer = {
            id:Math.floor(Math.random()*10000),
            name: name,
            score: score
        }
        this.player.push(player);
        // console.log("111111111111");
        (<HTMLInputElement>document.getElementById('a')).value="";
        localStorage.setItem('player', JSON.stringify(this.player));
    }
    deletePlayer(id:number){
        this.player = this.player.filter(player => player.id!= id);
        localStorage.setItem('player', JSON.stringify(this.player));
    }

    increaseScore(id: number): void {
        const index = this.player.findIndex(player => player.id === id);
        if (index !== -1) {
            this.player[index].score++;
            localStorage.setItem('player', JSON.stringify(this.player));
            this.renderPlayer()
        }
    }

    decreaseScore(id: number): void {
        const index = this.player.findIndex(player => player.id === id);
        if (index !== -1 && this.player[index].score > 0) {
            this.player[index].score--;
            localStorage.setItem('player', JSON.stringify(this.player));
            this.renderPlayer()
        }
    }
    
    
}

let a = new Player();
a.player = [
    {
        id: Math.floor(Math.random() *1000),
        name: 'a',
        score: 10
    }
]

a.renderPlayer();

function createPlayer(){
    a.createPlayer();
    a.renderPlayer();
}
function dltPlayer(id:number){
    a.deletePlayer(id);
    a.renderPlayer();  
}
function updatePlayer1(id:number){
    a.increaseScore(id);
    a.renderPlayer();
}
function updatePlayer2(id:number){
    a.decreaseScore(id);
    a.renderPlayer();
}



  