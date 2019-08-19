class CalcController {

    constructor() {
        
        this._displayCalcEl = document.getElementById('display')
        this._displayTimeEl = document.getElementById('hora')
        this._displayDateEl = document.getElementById('data')
        this._currentDate
        this._locale = 'pt-BR'
        this._operation = []
        this.initialize()
        this.initButtonsEvents()
    }

    initialize(){

        this.setDisplayDateTime()

        setInterval(()=>{
            this.setDisplayDateTime()    
        
        }, 1000)
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll(){
        this._operation = []
    }

    clearEntry(){
        this._operation.pop()
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1]
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value
    }

    isOperator(value){
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1)
    }

    pushOperation(value){
        this._operation.push(value)
    }

    addOperation(value){
        
        if (isNaN(this.getLastOperation())){
            
            if (this.isOperator(value)) {
                this.setLastOperation(value)

            } else if (isNaN(value)) {
                console.log(value);
                
            } else {
                this.pushOperation(parseInt(value))
            }

        } else {

            if (this.isOperator(value)) {
                this.pushOperation(value)

            } else {
                let newValue = this.getLastOperation() + value
                this.setLastOperation(parseInt(newValue))
            }
        }

        console.log(this._operation);
        
    }

    setError(){
        this.displayCalc = 'ERROR'
    }

    execBtn(value){
        switch (value){

            case 'ac':
                this.clearAll()
                break

            case 'ce':
                this.clearEntry()
                break

            case 'soma':
                this.addOperation('+')
                break

            case 'subtracao':
                this.addOperation('-')
                break

            case 'multiplicacao':
                this.addOperation('*')
                break

            case 'divisao':
                this.addOperation('/')
                break

            case 'porcento':
                this.addOperation('%')
                break

            case 'ponto':
                this.addOperation('.')
                break

            case 'igual':
                
                break

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
                this.addOperation(value)
                break

            default:
                this.setError()
                break
        }
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll('#buttons > g, #parts > g')
        
        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => { 
                let textBtn = btn.className.baseVal.replace("btn-","")
                this.execBtn(textBtn)
            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            })
        })

    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this.locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale)
    }

    get displayCalc(){
        return this._displayCalcEl
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value
    }

    get displayTime(){
        return this._displayTimeEl
    }

    set displayTime(value){
        this._displayTimeEl.innerHTML = value
    }

    get displayDate(){
        return this._displayDateEl
    }

    set displayDate(value){
        this._displayDateEl.innerHTML = value
    }

    get currentDate(){
        return new Date()
    }

    set currentDate(value){
        this._currentDate = value
    }

    get locale(){
        return this._locale
    }

    set locale(value){
        this._locale = value
    }

}