const appendBlock =(block) => document.getElementById('app').appendChild(block);
const randomRange =(min, max) => Math.floor(Math.random() * (max - min) + min)
const getColorOrEmptyOnRandom = () => {
 const isNotEmpty = Math.random() > 0.5;
  if (isNotEmpty) {
    return "yellow";
  }
  return null;
}
const createBlock =(x , y , size, color) => {
  const result = document.createElement('div')
  if (color) {
    result.style.backgroundColor = color;
  }
 result.style.width = result.style.height = `${size}px`
  result.style.position = "absolute";
 result.style.left = `${x}px`;
 result.style.top = `${y}px`;
  return result;
};
const BLOCK_SIZE = 50;
const DIMENSION = 8;

let columns = DIMENSION;
let rows = columns * 1 ;
let xPos = 0 ;
let yPos = 0 ;


while (rows-- > 0) {
 let line = [];
 xPos = 0;
columns = DIMENSION ;
while (columns-- > 0) {
   const color = getColorOrEmptyOnRandom()
   const block = createBlock(xPos, yPos, BLOCK_SIZE, color);
    line.push(block);
    xPos += BLOCK_SIZE;
   appendBlock(block)
  }

 line.reverse().forEach((color) => {
   const block = createBlock(xPos, yPos, BLOCK_SIZE, color);
   appendBlock(block)
    xPos += BLOCK_SIZE;
  })
  yPos += BLOCK_SIZE;
}
//const DOM = (id) => document.getElementById(id);
//const appendBlockToContainer = (block, container) => container.appendChild(block);
//const getColorOrEmptyOnRandom = () => {
  //const isNotEmpty = Math.random() > 0.5;
  //if (isNotEmpty) {
    //return "black";
 // }
 // return "red";
//};
//const createBlockWithParamsAtPosition = (x, y, size, color) => {
 // const result = document.createElement("div");
 // if (color) {
   // result.style.backgroundColor = color;
  //}
  //console.log(x, y);
 // result.style.width = result.style.height = `${size}px`;
 // result.style.position = "absolute";
 // result.style.color = "white";
  //result.style.left = `${x}px`;
  //result.style.top = `${y}px`;
 // return result;
//};
//const BLOCK_SIZE = 50;
//const STEP_DELTA_X = BLOCK_SIZE;
//const DIMENSION = 8;
//const DIMENSION_HALF = DIMENSION / 2;
//const container = DOM("app");
//let columns = 0;
//let rows = 0;
//let xPos = 0;
//let yPos = 0;
 //while (rows-- > 0) {
   //let colorsInLine = [];

  // const saveColorForFutureUse = (color) => {
   //  console.log(">saveColorForFutreUse", colorsInLine.length)
   //  colorsInLine.push(color);
   //}

   //while (columns++ < 4) {
    // const color = getColorOrEmptyOnRandom();
   //  const block = createBlockWithParamsAtPosition(xPos, yPos, BLOCK_SIZE, color);
   //  block.innerText = `${columns}`;
   //  saveColorForFutureUse(color);
   //  appendBlockToContainer(block, container);
   //  xPos += STEP_DELTA_X;
  // }
  // const rightHalfOffsetX = (DIMENSION / 2) * BLOCK_SIZE;
  // colorsInLine.reverse().forEach((color, index) => {
   //  const block = createBlock(BLOCK_SIZE * index + rightHalfOffsetX, yPos, BLOCK_SIZE, color);
   //  appendBlockToContainer(block);
  // });
  // yPos += BLOCK_SIZE;
 //}



