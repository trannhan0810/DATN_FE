/* eslint-disable import/prefer-default-export */
export const CLASS_UTILITY = `
 
  .m-p-0 {
    margin: 0;
    padding: 0;
  }
  .m-0 {
    margin: 0;
  }
  .m-20{
    margin-top: 20px;
  }
  .p-0 {
    padding: 0;
  }
  .cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
 
  /*----------Flex Box------*/
  .inline-block	{
    display: inline-block;
  }
  .flex {
    &&{
      display: flex;
    }
  }
  .center2 {
    &&{
      align-items: center;
      justify-content: center;
    }
  }
  f-center-col {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .items-center {
    align-items: center;
  }
  .justify-center	{
    justify-content: center;
  }
  .space-between	{
    justify-content: space-between;
  }
  .justify-around	{
    justify-content: space-around;
  }
  .justify-end	{
    justify-content: flex-end;
  }
  .horiz {
    flex-direction: row;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .horiz-reverse {
    flex-direction: row-reverse;
  }
  .vert {
    flex-direction: column;
  }
  .vert-reverse {
    flex-direction: column-reverse;
  }
  /*----------Position------*/
  .static {
    position: static;
  }
  .fixed {
    position: fixed;
  }
  .absolute {
    position: absolute;
  }
  .relative {
    position: relative;
  }
  .sticky {
    position: sticky;
  }
  /*-------------------List Style Type------------------------*/
  .list-none {
    list-style-type: none;
  }
  /*-------------------Top / Right / Bottom / Left------------*/
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .inset-y-0 {
    top: 0;
    bottom: 0;
  }
  .inset-x-0 {
    right: 0;
    left: 0;
  }
  .top-0 {
    top: 0;
  }
  .right-0 {
    right: 0;
  }
  .bottom-0 {
    bottom: 0;
  }
  .left-0 {
    left: 0;
  }
  .inset-auto {
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
  }
  .pointer-scale {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
  /*-------------------Object-fit-----------------------------*/
  .object-contain {
    object-fit: contain;
  }
  .object-cover {
    object-fit: cover;
  }
  .object-fill {
    object-fit: fill;
  }
  .object-none {
    object-fit: none;
  }
  .object-scale-down {
    object-fit: scale-down;
  }
  /*-------------------------text-------------------------------*/
  .tc {
    text-align: center;
  }
  .tl {
    text-align: left;
  }
  .tr {
    text-align: right;
  }
  .tj {
    text-align: justify;
  }
  .text-transparent {
    color: transparent;
  }
  .truncate-250 {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .line-clamp-3 {   
    display: -webkit-box;   
    -webkit-line-clamp: 3;   
    -webkit-box-orient: vertical;     
    overflow: hidden; 
  }
  .underline {
    text-decoration: underline;
  }
  .strike {
    text-decoration: line-through;
  }
  //----------------------boder-radius------------
  .r {
    border-radius: .25rem;
  }
  .r-40 {
    border-radius: 40px;
  }
  .r-1\\/2 {
    border-radius: 50%;
  }
  .r-full {
    border-radius: 9999px;
  }
  .r-t-10 {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .r-lg {
    border-radius: .5rem;
  }
  .r-full {
    border-radius: 9999px;
  }
  // ----------------------Border------------------
  .border-tr {
    border-top-width: 1px;
    border-right-width: 1px;
    border-style: solid;
  }
  .border-none {
    border: none !important;
  }
  /*--------------------Line Height----------------------------*/
  .leading-none	{
    line-height: 1;
  }
  .leading-tight	{
    line-height: 1.25;
  }  
  .leading-snug	{
    line-height: 1.375;
  }
  .leading-normal	{
    line-height: 1.5;
  }
  .leading-relaxed	{
    line-height: 1.625;
  }
  .leading-loose	{
    line-height: 2;
  }
  /*-------------------------Width-------------------------------*/
  .w-half {
    width: 50%;
  }
  .w-auto {
    width: auto;
  }
  .h-screen {
    height: 100vh;
  }
  .w-1\\/2 {
     width: 50%; 
  }
  .w-1\\/3 {
     width: 33.333333%; 
  }
  .w-2\\/3 {
     width: 66.6666667%; 
  }
  .w-1\\/4 {
     width: 25%; 
  }
  .w-3\\/4 {
     width: 75%; 
  }
  .w-1\\/5 {
     width: 25%; 
  }
  .w-2\\/5 {
     width: 40%; 
  }
  .w-3\\/5 {
     width: 60%; 
  }
  .w-4\\/5 {
     width: 80%; 
  }
  .w-full {
    width: 100%;
  }
  .w-screen {
    width: 100vw;
  }
  .w-50{
    width: 50px
  }
  /*-------------------------Height-------------------------------*/
  .h-68 {
    height: 68px;
  }
  .h-50{
    height: 50px
  }
  /*----------------------Background----------------------------*/
  .bg-auto {
    background-size: auto;
  }
  .bg-cover	{
    background-size: cover;
  }
  .bg-cover-auto {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .bg-contain {
    background-size: contain;
  }
  //-------------------Opacity--------------------------------*/
  .o-5 {
    opacity: .05;
  }
  .o-70 {
    opacity: .7;
  }
  .o-75	{
    opacity: .75;
  }
  .o-50	{
    opacity: .5;
  }
  .o-25	{
    opacity: .25;
  }
  /*-----------------------Box shadow---------------------------*/
  .shadow {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  .shadow-2 {
    box-shadow: 0px 0px 20px rgba(33, 33, 33, 0.1);
  }
  .shadow-3 {
    box-shadow: 0px 6px 18px rgba(144, 164, 183, 0.22);
  } 
  .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  /*--------------------Oveflow----------------------------------*/
  .ovf-x-hidden {
    overflow-x: hidden;
  }
  .ovf-y-auto {
    overflow-y: auto;
  }
  /*-----------------------Hover---------------------------------*/
  .grow {
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform 0.25s ease-out;
    &:hover, &:focus {
      transform: scale(1.05);
    }
  }
  .dim {
    opacity: 1;
    transition: opacity .15s ease-in;
    &:hover, &:focus {
      opacity: .5;
      transition: opacity .15s ease-in;
    }
  }
  .fade-hide {
    visibility: hidden;
    opacity: 0;
    transition: visibility 1s, opacity 1s;
  }
  .fade-show {
    visibility: visible;
    opacity: 1;
    transition: visibility 1s, opacity 1s;
  }
   /*--------------------------Grid---------------------------------*/
  .grid-flow-row {
    grid-auto-flow: row;
  }
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-flow-row-dense {
    grid-auto-flow: row dense;
  }
  .grid-flow-col-dense {
    grid-auto-flow: column dense;
  }
  .col-auto	{
    grid-column: auto;
  }
  .col-span-1	{
    grid-column: span 1 / span 1;
  }
  .col-span-2	{
    grid-column: span 2 / span 2;
  }
  .col-span-3	{
    grid-column: span 3 / span 3;
  }
  .col-span-4	{
    grid-column: span 4 / span 4;
  }
  .col-span-5	{
    grid-column: span 5 / span 5;
  }
  .col-span-6	{
    grid-column: span 6 / span 6;
  }
  .col-span-7	{
    grid-column: span 7 / span 7;
  }
  .col-span-8	{
    grid-column: span 8 / span 8;
  }
  .col-span-9	{
    grid-column: span 9 / span 9;
  }
  .col-span-10	{
    grid-column: span 10 / span 10;
  }
  .col-span-11	{
    grid-column: span 11 / span 11;
  }
  .col-span-12	{
    grid-column: span 12 / span 12;
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2	{
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3  {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4	{
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5	{
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6	{
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .grid-cols-7	{
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .grid-cols-8	{
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .grid-cols-9	{
    grid-template-columns: repeat(9, minmax(0, 1fr));
  }
  .grid-cols-10	{
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-11	{
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
  .grid-cols-12	{
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
  .gap-0 {
    gap: 0;
  }
  
`
