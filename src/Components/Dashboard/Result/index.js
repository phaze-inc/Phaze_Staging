import React from 'react'
import './index.css'
import GiftCard from '../GiftCard'

class Result extends React.Component{
    constructor(props){
        super(props)
        this.state={
            info: null,
            type: 0,
            copyCode: false,
            copyPIN: false
        }
    }
    componentDidMount(){
        if(!this.props.location.state){
            this.props.history.push('/dashboard')
            return
        }   
        let type = 0                                        // by default it's 0 = link type
        if(this.props.location.state.code)
            type = 1
        if(this.props.location.state.pin)
            type = 2
        this.setState({
            info: this.props.location.state,
            type: type
        })
    }
    CopyCode = ()=>{
        try{
            let tempElement = document.createElement('textarea')
            tempElement.value = this.state.info.code
            tempElement.setAttribute('readonly', '')
            tempElement.style.position = 'absolute'
            tempElement.style.left = '-9999px'
            document.body.appendChild(tempElement)
            tempElement.select()
            document.execCommand('copy')
            document.body.removeChild(tempElement)
            this.setState({
                copyCode: true
            })
        }catch(error){
            console.log(error)
        }
    }
    CopyPIN = ()=>{
        try{
            let tempElement = document.createElement('textarea')
            tempElement.value = this.state.info.pin
            tempElement.setAttribute('readonly', '')
            tempElement.style.position = 'absolute'
            tempElement.style.left = '-9999px'
            document.body.appendChild(tempElement)
            tempElement.select()
            document.execCommand('copy')
            document.body.removeChild(tempElement)
            this.setState({
                copyPIN: true
            })
        }catch(error){
            console.log(error)
        }
    }
    render(){
        if(!this.props.location.state || !this.state.info)
            return null
        let content = null                                    
        switch(this.state.type){
            case 0:
                content = <div className='LinkType'>
                                    <p className='Goback' onClick={()=>this.props.history.push('/dashboard')}><i className="fas fa-long-arrow-alt-left"></i> SHOP</p>
                                    <button onClick={()=>this.props.history.push('/dashboard')} className='button-2 Goback'><i className="fas fa-long-arrow-alt-left"></i></button>
                                    <button className='button-1' onClick={()=>window.open(this.state.info.link, '_blank')}>view gift card<i className="fas fa-arrow-right"></i></button>
                                    <button className='button-2'>email me my gift card<i className="fas fa-directions"></i></button>
                                </div>
                break
            case 1:
                content = <div className='CodeType'>
                                    <p className='Goback' onClick={()=>this.props.history.push('/dashboard')}><i className="fas fa-long-arrow-alt-left"></i> SHOP</p>
                                    <p className='Tooltip'>GIFT CARD CODE</p>
                                    <p className='Copyable'>
                                        {this.state.info.code}
                                        {this.state.copyCode?<i className="fas fa-check"></i>:<i onClick={this.CopyCode} className="far fa-copy"></i>}
                                    </p>
                                    <button onClick={()=>this.props.history.push('/dashboard')} className='button-2 Goback'><i className="fas fa-long-arrow-alt-left"></i></button>
                                    <button className='button-1'>autofill gift card code<i className="fas fa-arrow-right"></i></button>
                                    <button className='button-2'>email me my gift card<i className="fas fa-directions"></i></button>
                                </div>
                break
            case 2:
                content = <div className='PINType'>
                                    <p className='Goback' onClick={()=>this.props.history.push('/dashboard')}><i className="fas fa-long-arrow-alt-left"></i> SHOP</p>
                                    <p className='Tooltip'>GIFT CARD CODE</p>
                                    <p className='Copyable'>
                                        {this.state.info.code}
                                        {this.state.copyCode?<i className="fas fa-check"></i>:<i onClick={this.CopyCode} className="far fa-copy"></i>}
                                    </p>
                                    <p className='Tooltip'>PIN NUMBER</p>
                                    <p className='Copyable PIN'>
                                        {this.state.info.pin}
                                        {this.state.copyPIN?<i className="fas fa-check"></i>:<i onClick={this.CopyPIN} className="far fa-copy"></i>}
                                    </p>
                                    <button onClick={()=>this.props.history.push('/dashboard')} className='button-2 Goback'><i className="fas fa-long-arrow-alt-left"></i></button>
                                    <button className='button-1'>autofill gift card code<i className="fas fa-arrow-right"></i></button>
                                    <button className='button-2'>email me my gift card<i className="fas fa-directions"></i></button>
                                </div>
                break
            default:
                content = null
        }
        return  <div id='Result'>
                        <p className='Title'>{this.state.info.brandname}</p>
                        <div className='Card'>
                            <GiftCard urlpath={this.state.info.brandcode} />
                        </div>
                        <p className='Amount'>AMOUNT<span>${Number(this.state.info.amount).toFixed(2)}</span><small>{this.state.info.currency}</small></p>
                        {content}
                    </div>
    }
}

export default Result