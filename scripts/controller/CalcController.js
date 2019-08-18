class CalcController {

    constructor() {
        
        this._displayCalcEl = document.getElementById('display')
        this._displayTimeEl = document.getElementById('hora')
        this._displayDateEl = document.getElementById('data')
        this._currentDate
        this._locale = 'pt-BR'
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

    initButtonsEvents(){

        let buttons = document.querySelectorAll('#buttons > g, #parts > g')
        
        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => { 
                console.log(btn.className.baseVal.replace("btn-",""))
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