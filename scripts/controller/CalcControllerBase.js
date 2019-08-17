class CalcController {

    constructor() {

        this._locale = 'pt-BR'
        this._displayCalcEl = document.getElementById('display')
        this._dateEl = document.getElementById('data')
        this._timeEl = document.getElementById('hora')
        this._currentDate
        this.initialize()
    }

    initialize(){

        this.setDisplayDateTime()

        setInterval(()=>{
            
            this.setDisplayDateTime()

        },1000)

    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g')
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    get displayCalcEl(){
        return this._displayCalcEls
    }

    set displayCalcEl(value){
        this._displayCalcEl = value
    }

    get displayDate(){
        return this.dateEl.innerHTML
    }

    set displayDate(value){
        this._dateEl.innerHTML = value
    }

    get displayTime(){
        return this.timeEl.innerHTML
    }

    set displayTime(value){
        this._timeEl.innerHTML = value
    }

    get currentDate(){
        return new Date()
    }

    set currentDate(value){
        this._currentDate = value
    }

}