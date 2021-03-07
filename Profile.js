import React from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native';
import { Text, View,TouchableOpacity , StyleSheet,
    ActivityIndicator,
    FlatList,
    Alert
    } from 'react-native';
import {  Card } from 'react-native-elements';



class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        loading: true,
        dataSource:[] };
        }
        componentDidMount(){
        fetch("http://dummy.restapiexample.com/api/v1/employees")
        .then(response => response.json())
        .then((responseData)=> {
        this.setState({
        loading: false,
        dataSource: responseData.data
        })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
        }
        delete(id) {
            var url = 'http://dummy.restapiexample.com/api/v1/delete/'+id;
            axios.delete(url)
            .then(res => console.log(res.data));
        }
        FlatListItemSeparator = () => {
            return (
            <View style={{
            height: .5,
            width:"100%",
            backgroundColor:"rgba(0,0,0,0.5)",
            }}
            />
            );
            }
        handlerLongClick = (item) => {
            Alert.alert(
                "Delete employee "+item.employee_name,
                "Are you sure ?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                    { text: "Delete", onPress: (id) => 
                        {
                            this.delete(id)
                        } 
                    }
                ],
                { cancelable: false }
              );
        };
        
        handlerClick = (data) => {
            //handler for Long Click
            // data= {this:state.dataSource}
            // var data = this.state.dataSource
            console.log(data)
            alert('presed'+JSON.stringify(data));
            // alert('presed');

        };
        renderItem=(data)=>
        <TouchableOpacity style={styles.list}
        onLongPress={()=>this.handlerLongClick(data.item)}
        onPress={() => this.handlerClick(data.item.employee_name)}
        >
        <Card borderRadius={10} >
        <Text style={styles.lightText}>Employee Id : {data.item.id}</Text>
        <Text style={styles.lightText}>Employee Name : {data.item.employee_name}</Text>
        <Text style={styles.lightText}>Employee Salary : {data.item.employee_salary}</Text>
        <Text style={styles.lightText}>Employee Age : {data.item.employee_age}</Text>
        </Card >
        </TouchableOpacity>

    render(){
        if(this.state.loading){

                return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#5b0773"/>
                </View>
                )

            }
        return(
        <View style={styles.container}>
        <View>
        <Text> Employee Details</Text>
        </View>
        <FlatList
         data= {this.state.dataSource}
         // ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
        />
        
        </View>
        )}

}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#d9d7d7",
    },
    loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
    },
    list:{
    paddingVertical: 20,
    backgroundColor: "#fff"
    
    }
    });
export default Employee;