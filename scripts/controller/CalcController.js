class CalcController {

    constructor(){

        this._displayCalcEl = document.getElementById('display');
        this._displayTimeEl = document.getElementById('hora');
        this._displayDateEl = document.getElementById('data');
        this._currentDate;
        this._locale = 'pt-BR';
        this._number1 = '';
        this._number2 = '';
        this._symbols = [];
        this._lastEntry = '';
        this._lastNumber = '';
        this._lastOperator = '';
        this._flagNumber = 0;
        this._audioOn = false;
        this._audio = new Audio('click.mp3');
        
        this.initialize();
        this.initButtonsEvents();
        this.initkeyboard();

    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){

        if(value.toString().length > 10){
            this.msgError();
            return false
        }
        this._displayCalcEl.innerHTML = value;
    }

    get displayTime(){
        return this._displayTimeEl.innerHTML;
    }

    set displayTime(value){
        this._displayTimeEl.innerHTML = value;
    }

    get displayDate(){
        return this._displayDateEl.innerHTML;
    }

    set displayDate(value){
        this._displayDateEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    get locale(){
        return this._locale;
    }

    set locale(value){
        this._locale = value;
    }

    showConsole(){

        console.log(`\nnumero 1: ${this._number1}`);
        console.log(`numero 2: ${this._number2}`);
        console.log(`simbolos: ${this._symbols}`);
        console.log(`Ultimo Numero: ${this._lastNumber}`);
        console.log(`Ultimo Operador: ${this._lastOperator}`);
        console.log(`Ultimas entrada: ${this._lastEntry}`);

    }

    setDisplayDateTime(){

        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
        this.displayDate = this.currentDate.toLocaleDateString(this.locale);

    }

    toggleAudio(){
        this._audioOn = !this._audioOn;
    }

    playAudio(){

        if (this._audioOn){

            this._audio.currentTime = 0;
            this._audio.play();
        }
    }

    initialize(){
        
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        this.pasteFromClipboar();

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {

                this.toggleAudio();

                console.log(this._audioOn);

            });
        });
    }

    copytoClipboard(){

        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        input.remove();

    }

    pasteFromClipboar(){

        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
        });
    }

    msgError(){
        this.displayCalc = 'ERROR';
    }

    clearDisplay(){
        this.displayCalc = '0';
    }

    allClear(){

        this._number1 = '';
        this._number2 = '';
        this._symbols = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this._lastEntry = '';
        this._flagNumber = 0;

        this.clearDisplay();

        this.showConsole();
        
    }

    clearEntry(){
        
        if (this._number2 != ''){
            this._number2 = '';

        } else {
            this._number1 = '';
            this._flagNumber = 0;
        }

        this.clearDisplay();

        this.showConsole();

    }

    concatNumber(obj, number){
        return obj.concat(number);        
    }

    //calc 'number1 op number2'
    calc(){
        
        let result = eval(`(${this._number1}) ${this._symbols[0]} (${this._number2})`);
        
        this._number1 = result.toString();
        this._lastNumber = this._number2;
        this._lastOperator = this._symbols[0];
        
        this._number2 = '';
        this._symbols.pop();
        this.displayCalc = this._number1;

        this.showConsole();
        
    }

    //recalc with correctly condition
    recalc(){
        
        let result = eval(`(${this._number1}) ${this._lastOperator} (${this._lastNumber})`);
        this._number1 = result.toString();
        this.displayCalc = this._number1;

        this.showConsole();
    }
    
    // check all conditions to calc a value
    checkCalc(){
        return (this._number1 != '' && this._number2 != '' && this._symbols.length > 0);
    }

    //check all conditions to recalc a value
    checkReCalcl(){
        return (this._number1 != '' && this._number2 == '' && this._lastNumber != '' && this._lastOperator != '');
    }

    changeSymbol(symbol){

        this._symbols.pop();
        this._symbols.push(symbol);

    }
    
    //when entry is a symbol
    symbolEntry(symbol){

        if (symbol == '='){
            //when user put number1, op and number2
            if (this.checkCalc()){
                this.calc();
            
            // when user already done a calc and press '=' again
            } else if (this.checkReCalcl()){

                this.recalc();
            }

        } else {

            if (this._lastEntry == 'n'){

                // when calc has only first number (number1)
                if (this._symbols.length == 0){

                    this._symbols.push(symbol);
                    this._lastEntry = 's';  
                    
                //when we have two numbers and 1 op, we need to calc this before to put a new op
                } else if (this.checkCalc()){
                    
                    this.calc();
                    this._symbols.push(symbol);
                    this._lastEntry = 's';

                } else {

                    //when user clicks on two different symbols
                    this.changeSymbol(symbol);
                }

            } else {
                
                this.changeSymbol(symbol);
            }

            this._flagNumber++;
        }

        this.showConsole();
    }

    replacePercent(){
        return '/100';
    }

    concatNumber(n1, n2){
        return n1.concat(n2);
    }

    numberEntry(number){
        
        if (this._flagNumber > 0){

            if (number == '%'){
                
                this._number2 = this.concatNumber(this._number2, this.replacePercent());
                this._lastEntry = 'n';

            } else {
                
                this._number2 = this.concatNumber(this._number2, number);
                this.displayCalc = this._number2;
                this._lastEntry = 'n';
            }
            
        } else {

            if (number == '%'){

                this._number1 = this.concatNumber(this._number1, this.replacePercent());
                this._lastEntry = 'n';
                this._flagNumber++;

            } else {
            
                this._number1 = this.concatNumber(this._number1, number);
                this.displayCalc = this._number1;
                this._lastEntry = 'n';
            }
        }

        this.showConsole();
    }

    execBtn(value){
     
        this.playAudio();

        switch (value){
            
            case 'ac':
                this.allClear();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.symbolEntry('+');
                break;

            case 'subtracao':
                this.symbolEntry('-');
                break;

            case 'multiplicacao':
                this.symbolEntry('*');
                break;

            case 'divisao':
                this.symbolEntry('/');
                break; 

            case 'igual':
                this.symbolEntry('=');
                break;
                
            case 'porcento':
                this.numberEntry('%');
                break;

            case 'ponto':
                this.numberEntry('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                this.numberEntry(value);
                break;
                   
            default:
                this.msgError();
                break;
        }
    }

    mouseCursor(btn){
        btn.style.cursor = 'pointer';
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach(btn => {

            btn.addEventListener('click', () => {
                let textBtn = btn.className.baseVal.replace("btn-","");
                this.execBtn(textBtn);
            });

            btn.addEventListener('mouseover', () => {
                this.mouseCursor(btn);
            });
        });
    }

    initkeyboard(){

        document.addEventListener('keyup', e => {

            this.playAudio();

            let value = e.key;

            switch (value){

                case 'Escape':
                    this.allClear();
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    break;
    
                case '+':
                case '-':
                case '*':
                case '/':
                case '=':
                    this.symbolEntry(value);
                    break;
    
                case 'Enter':
                    this.symbolEntry('=');
                    break;
                    
                case '%':
                case '.':
                    this.numberEntry(value);
                    break;
    
                case ',':
                    this.numberEntry('.');
                    break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
    
                    this.numberEntry(value);
                    break;
                
                case 'c':
                    if(e.ctrlKey) this.copytoClipboard();
                    break;
            }
        });
    }
}