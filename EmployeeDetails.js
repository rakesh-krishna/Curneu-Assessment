import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
TouchableOpacity
} from "react-native";
class EmployeeDetails extends React.Component {
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
renderItem=(data)=>
<TouchableOpacity style={styles.list}>
<Text style={styles.lightText}>Employee Name : {data.item.employee_name}</Text>
<Text style={styles.lightText}>Employee Salary : {data.item.employee_salary}</Text>
<Text style={styles.lightText}>Employee Age : {data.item.employee_age}</Text></TouchableOpacity>
render(){
if(this.state.loading){
return(
<View style={styles.loader}>
<ActivityIndicator size="large" color="#0c9"/>
</View>
)}
return(
<View style={styles.container}>
<View >
<Text> Employee Details</Text>
</View>
<FlatList
data= {this.state.dataSource}
ItemSeparatorComponent = {this.FlatListItemSeparator}
renderItem= {item=> this.renderItem(item)}
keyExtractor= {item=>item.id.toString()}
/>
</View>
)}
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#0c9"
},
loader:{
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#fff"
},
list:{
paddingVertical: 20,
margin: 5,
backgroundColor: "#fff"
}
});

export default EmployeeDetails;