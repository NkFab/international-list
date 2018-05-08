import React, { PureComponent } from 'react'
import { TouchableHighlight } from 'react-native'
import { ListItem } from '../Lists';
class Listint extends PureComponent {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}>
                <ListItem
                    title={this.props.code}
                    subtitle={this.props.name}
                    hideAvatar={false}
                    roundAvatar={false}
                    avatar={{ uri: this.props.flag }}
                    rightComponentText={this.props.res}
                />
            </TouchableHighlight>
        )
    }
}
export default Listint;