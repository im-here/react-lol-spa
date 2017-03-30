import React, {Component} from 'react';
import {Link} from 'react-router';
import {occupation} from 'src/Config/staticData';
import { is, fromJS} from 'immutable';

export default class SummonerList extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render(){
        let {name, title, tags, keys, index, click} = this.props;
        return (
            <li onClick={ e=>this.props.summonerClick({name, keys})} key={_.uniqueId()}>
               <Link to='/heroContent'>
                    <div className="summoner-item">
                        <div className="summoner-img">
                            <img src={`http://cdn.tgp.qq.com/pallas/images/champions_id/${keys}.png`} />
                        </div>
                        <div className="summoner-main">
                            <h5>{name}</h5>
                            <p className="summoner-title">{title}</p>
                                <p className="summoner-tags">
                                {
                                    tags.map(_k => {
                                        return (
                                            <span key={_.uniqueId()}>{occupation[_k]}</span>
                                        )
                                    })
                                }
                            </p>
                        </div>
                    </div>
               </Link>
            </li>
        )
    }
}