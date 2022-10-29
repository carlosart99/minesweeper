const field = document.querySelector('.field');
const SIZE = 100;

let bombs = [];
for (let i=0; i<10; i++){
    let bomb = Math.floor(Math.random() * 100);
    if (bombs.includes(bomb)){
        i--;
    }
    else{
        bombs.push(bomb);
    }
}

function getCellValue(cellIndex, bombs){
    let value=0;
    if(bombs.includes(cellIndex-9) && parseInt(cellIndex/10) != parseInt((cellIndex-9)/10)){
        value++;
    }
    if(bombs.includes(cellIndex-10)){
        value++;
    }
    if(bombs.includes(cellIndex-11) && (parseInt((cellIndex/10)-1) === parseInt((cellIndex-11)/10))){
        value++;
    }
    if(bombs.includes(cellIndex-1) && parseInt(cellIndex/10) === parseInt((cellIndex-1)/10)){
        value++;
    }
    if(bombs.includes(cellIndex+1) && parseInt(cellIndex/10) === parseInt((cellIndex+1)/10)){
        value++;
    }
    if(bombs.includes(cellIndex+9) && cellIndex + 9 < SIZE && (parseInt((cellIndex/10)+1) === parseInt((cellIndex+9)/10))){
        value++;
    }
    if(bombs.includes(cellIndex+10) && cellIndex + 10 < SIZE){
        value++;
    }
    if(bombs.includes(cellIndex+11) && cellIndex+11 < SIZE && (parseInt((cellIndex/10)+1) === parseInt((cellIndex+11)/10))){
        value++;
    }
    return value;
}

function removeDirt(cell){
    let cellIndex = parseInt(cell.replace('cell-dirt-',''));
    let cells = document.querySelectorAll('.cell');
    if(cellIndex-9 > 0 && cells[cellIndex-9].className === 'cell dirt' && cells[cellIndex-9].querySelector('div').style.display!='none' && parseInt(cellIndex/10) != parseInt((cellIndex-9)/10)){
        cells[cellIndex-9].querySelector('div').style.display='none';
        removeDirt(cells[cellIndex-9].querySelector('div').id);
    }
    else if(cellIndex-9 > 0  && parseInt(cellIndex/10) != parseInt((cellIndex-9)/10)){
        cells[cellIndex-9].querySelector('div').style.display='none';
    }
    if(cellIndex-10 > 0 && cells[cellIndex-10].className === 'cell dirt' && cells[cellIndex-10].querySelector('div').style.display!='none'){
        cells[cellIndex-10].querySelector('div').style.display='none';
        removeDirt(cells[cellIndex-10].querySelector('div').id);
    }
    else if(cellIndex-10 > 0){
        cells[cellIndex-10].querySelector('div').style.display='none';
    }    
    if(cellIndex-11 > 0 && cells[cellIndex-11].className === 'cell dirt' && cells[cellIndex-11].querySelector('div').style.display!='none' && (parseInt((cellIndex/10)-1) === parseInt((cellIndex-11)/10))){
        cells[cellIndex-11].querySelector('div').style.display='none';
        removeDirt(cells[cellIndex-11].querySelector('div').id);
    }
    else if(cellIndex-11 > 0 && (parseInt((cellIndex/10)-1) === parseInt((cellIndex-11)/10))){
        cells[cellIndex-11].querySelector('div').style.display='none';
    }    
    if(cellIndex-1 > 0 && cells[cellIndex-1].className === 'cell dirt' && cells[cellIndex-1].querySelector('div').style.display!='none' && parseInt(cellIndex/10) === parseInt((cellIndex-1)/10)){
        cells[cellIndex-1].querySelector('div').style.display='none';
        removeDirt(cells[cellIndex-1].querySelector('div').id);
    }
    else if(cellIndex-1 > 0 && parseInt(cellIndex/10) === parseInt((cellIndex-1)/10)){
        cells[cellIndex-1].querySelector('div').style.display='none';
    }    
    if(cellIndex+1 < SIZE && cells[cellIndex+1].className === 'cell dirt' && cells[cellIndex+1].querySelector('div').style.display!='none' && parseInt(cellIndex/10) === parseInt((cellIndex+1)/10)){
        cells[cellIndex+1].querySelector('div').style.display='none';
        removeDirt(cells[cellIndex+1].querySelector('div').id);
    }
    else if(cellIndex+1 < SIZE && parseInt(cellIndex/10) === parseInt((cellIndex+1)/10)){
        cells[cellIndex+1].querySelector('div').style.display='none';
    }    
    if(cellIndex+9 < SIZE && cells[cellIndex+9].className === 'cell dirt' && cells[cellIndex+9].querySelector('div').style.display!='none' && cellIndex + 9 < SIZE && (parseInt((cellIndex/10)+1) === parseInt((cellIndex+9)/10))){
        cells[cellIndex+9].querySelector('div').style.display='none';
        removeDirt(cells[cellIndex+9].querySelector('div').id);
    }
    else if(cellIndex+9 < SIZE && cellIndex + 9 < SIZE && (parseInt((cellIndex/10)+1) === parseInt((cellIndex+9)/10))){
        cells[cellIndex+9].querySelector('div').style.display='none';
    }    
    if(cellIndex+10 < SIZE && cells[cellIndex+10].className === 'cell dirt' && cells[cellIndex+10].querySelector('div').style.display!='none' && cellIndex + 10 < SIZE){
        cells[cellIndex+10].querySelector('div').style.display='none';
        removeDirt(cells[cellIndex+10].querySelector('div').id);
    }
    else if(cellIndex+10 < SIZE && cellIndex + 10 < SIZE){
        cells[cellIndex+10].querySelector('div').style.display='none';
    }    
    if(cellIndex+11 < SIZE && cells[cellIndex+11].className === 'cell dirt' && cells[cellIndex+11].querySelector('div').style.display!='none' && cellIndex+11 < SIZE && (parseInt((cellIndex/10)+1) === parseInt((cellIndex+11)/10))){
        cells[cellIndex+11].querySelector('div').style.display='none';
        removeDirt(cells[cellIndex+11].querySelector('div').id);
    }
    else if(cellIndex+11 < SIZE && cellIndex+11 < SIZE && (parseInt((cellIndex/10)+1) === parseInt((cellIndex+11)/10))){
        cells[cellIndex+11].querySelector('div').style.display='none';
    }        

}


for (let i=0; i<SIZE; i++){
    const content = document.createElement('div');
    const hideLayer = document.createElement('div');
    hideLayer.className = 'hide-layer';
    if (bombs.includes(i)){
        content.className = 'cell bomb';
        content.style.backgroundColor = 'red';
        hideLayer.id = 'bomb';
    }
    else{
        let cellValue = getCellValue(i,bombs);
        content.className = 'cell';
        if (cellValue === 0){
            content.className = 'cell dirt';
            hideLayer.id = 'cell-dirt-'+ i;
        }
        else{
            content.className = 'cell value';
            hideLayer.id = 'cell-' + i ;
        }
        content.innerText = cellValue;
    }    
    field.appendChild(content);
    content.appendChild(hideLayer);
}

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if(e.target && (e.target.className==='hide-layer')){
        removeDirt(e.target.id);
        e.target.style.backgroundColor = 'green';
    }
})

document.addEventListener('click',function(e){
    console.log(e.button)
    if(e.target && (e.target.id.includes('cell-dirt'))){
        removeDirt(e.target.id);
        e.target.style.display = 'none';
    }
    else if(e.target && (e.target.id.includes('cell-'))){
        e.target.style.display = 'none';
    }
    else if (e.target && e.target.id==='bomb'){
        e.target.style.display = 'none';
        alert('Bomb you lose');
    }
})