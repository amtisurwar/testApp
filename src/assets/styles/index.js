import { StyleSheet } from 'react-native';

const PRIMARY_COLOR = '#28558E';
const WHITE_COLOR = 'white';
const BLACK_COLOR = 'black';
const GREY_COLOR = '#808080';

var styles = StyleSheet.create({
  splash: {
    width: '100%',
    height: '100%',
  },
  red: {
    color:'red'
  },
  flexContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  center:{justifyContent:'center', alignItems:'center'},
  imageThumbnail:{
    borderWidth:1,
    width:'100%',
    flex:1,
  },
  container: {
    margin:5,
    flex:1,
    justifyContent:'center',
  },
  mtop15:{
    marginTop:15
  },
  errorContainer: {
    backgroundColor:'red',
    padding:10,
  },
  errorMessage: {
    color:'#FFF'
  },
  postIcons: {
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#ccc',
    marginVertical:10,
    flexDirection:'row',
    alignItems:'center'
  },
  answerRow: {
    
    flexDirection:'row',
  },
  itemSeperator: {
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    marginVertical:10,
  },
  Part1: {
    backgroundColor: '#E82368',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 90,
},
Part2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
},
Part3: {
    backgroundColor: '#FBD5E5',
    flex:1,
},
row: { flexDirection: 'row', marginBottom:15, borderBottomColor:'#000', borderBottomWidth:0.3, paddingBottom:5 },
primary: { color: '#E82368' },
secondaryBackground: { backgroundColor: '#FBD5E5' },
part3Content: {
    paddingHorizontal: 20,
    position: 'relative',
    bottom: 50,

},
bold: {
    fontWeight: 'bold'
},
part2Card: {
    position: 'relative',
    bottom: 75,
    borderRadius: 6,
},
center: {
    alignItems: 'center',
    justifyContent: 'center'
},
avatar: {
    borderRadius: 800,
    borderWidth: 1,
    borderColor: '#FFF',
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
},
white: {
    color: '#FFF'
},
imageName: { fontSize: 40 },
name: { fontSize: 18 }

});

module.exports = styles;