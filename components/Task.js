import { StyleSheet, Text, View } from 'react-native';

export default function Task(props) {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  )
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'white',
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    square: {
        height: 24,
        width: 24,
        backgroundColor: 'white',
        borderColor: 'white',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
      maxWidth: '80%',
      color: 'white'
    },
    circular: {
      width: 12,
      height: 12,
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 5,
    },
});