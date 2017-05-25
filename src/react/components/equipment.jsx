class Rezultat extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            show: 0
            
        }
        
    }
    
    
    
    render() {
        
        
        return (
            
            <div>
                {this.props.show ? (
                    <p>Rezultatul</p>
                ) : (
                    <p>Nimic inca</p>
                )}
            </div>
        
        )
        
    }
    
}


class Input extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            denumire: this.props.denumire,
            suma: this.props.suma
        }
        
        this.changeSuma = this.changeSuma.bind(this);
        this.key = this.props.reactKey;
    }
    
    
    changeSuma(events){
        this.props.onUpdate(this.key, 'suma', event.target.value);
    }
    
    changeDenumire(event){
         this.props.onUpdate(this.key, 'suma', event.target.value);
    }
    
    render() {
        
        return(
            
             <div className="form-group">
               <div className="row">
                   <div className="col-md-4">
                       <label htmlFor="">Denumire</label>
                        <input type="text" defaultValue={this.state.denumire} />
                   </div>
                    <div className="col-md-4">
                       <label htmlFor="">Suma</label>
                        <input type="text" placeholder={this.state.suma} onChange={this.changeSuma} />
                   </div>
               </div>
               <hr></hr>
            </div>
        
        
        )
       
    }
}


class Equipment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            campuri: [
                {"denumire": "Angajati", "suma": "ex: 54.794"},
                {"denumire": "Consultant", "suma": "ex: 8.000"}
            ],
            rezultat: 0
        };
        
        this.calculeaza = this.calculeaza.bind(this);
        this.update = this.update.bind(this);
        var eqp = this;
    }
    
    calculeaza(){
        
        let x = 1;
        this.setState({
           rezultat: 1,
            show: 'a'
        });
        
        
    }
    
  
    
    update(index, field, value){
        console.log('updated the input with index', index);
        console.log('the field is', field);
        console.log('the value is', value);
    }
    
    componentDidMount(){
        console.log('equipment rendered');
    }
    
    render() {
     
        return (
            <div className="calc-section">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                
                {this.state.campuri.map(function(camp, index){
                    return (
                        <Input denumire={camp.denumire} suma={camp.suma} key={index} reactKey={index} onUpdate={this.update} />
                    )
                }, this)
                }
                
                <button onClick={this.calculeaza} >Calculeaza</button>
                
                <Rezultat show={this.state.rezultat} />
            </div>    
        )
    }   
}



module.exports = Equipment; 