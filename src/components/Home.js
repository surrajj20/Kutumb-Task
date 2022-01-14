import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView } from "react-native";
import { calcHeight, calcWidth } from "../Dimensions/dimensions";

class Home extends React.Component {

    state = {
        loading: true,
        datas: [],
        hide: true
    };

    navigateTrending = () => {
        this.props.navigation.navigate("Trending");
      };

    componentDidMount() {
        this.getDatas();
    }

    showDescription = () => {
        if (this.state.hide === true) {
            this.setState(() => ({
                hide: false
            }))

        } else {
            this.setState(() => ({
                hide: true
            }))

        }

    }

    showTrendingRepo = (data) => {
        return (
            <View>
                <TouchableOpacity onPress={this.showDescription}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "space-between" }}>
                        <View>
                            <ImageBackground
                                style={{ height: calcHeight(7.5), width: calcWidth(14), marginTop: calcHeight(1.5), marginLeft: calcWidth(3) }}
                                imageStyle={{ borderRadius: 100 }}
                                source={{ uri: `${data.builtBy[0].avatar}` }}
                            >
                            </ImageBackground>
                        </View>
                        <View>
                            <Text style={{ color: "#000000", fontSize: 15 }}>{data.builtBy[0].username}</Text>
                            <Text style={{ color: "#000000", fontSize: 16, fontWeight: "bold", width: calcWidth(75) }}>{data.repositoryName}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {this.state.hide === false ? (
                    <View style={{ marginTop: calcHeight(1) }}>
                        <Text style={{ color: "#9FA2A3", fontSize: 12, width: calcWidth(75), marginLeft: calcWidth(25) }}>{data.description}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "space-between", marginLeft: calcWidth(25) }}>
                            <View style={{ flexDirection: "row" }}>
                                <ImageBackground
                                    style={{ height: calcHeight(1), width: calcWidth(2), marginTop: calcHeight(1) }}
                                    imageStyle={{ borderRadius: 100 }}
                                    source={require("../../Assets/images/reddot.png")}
                                >
                                </ImageBackground>
                                <Text style={{ color: "#9FA2A3", fontSize: 12, width: calcWidth(20), marginLeft: calcWidth(2) }}>{data.language}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <ImageBackground
                                    style={{ height: calcHeight(2), width: calcWidth(4), marginTop: calcHeight(0.5) }}
                                    imageStyle={{ borderRadius: 100 }}
                                    source={require("../../Assets/images/star.png")}
                                >
                                </ImageBackground>
                                <Text style={{ color: "#9FA2A3", fontSize: 12, width: calcWidth(15), marginLeft: calcWidth(2) }}>{data.totalStars}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <ImageBackground
                                    style={{ height: calcHeight(2), width: calcWidth(4), marginTop: calcHeight(0.5) }}
                                    imageStyle={{ borderRadius: 100 }}
                                    source={require("../../Assets/images/fork.png")}
                                >
                                </ImageBackground>
                                <Text style={{ color: "#9FA2A3", fontSize: 12, width: calcWidth(15), marginLeft: calcWidth(2) }}>{data.forks}</Text>
                            </View>
                        </View>
                    </View>
                ) : null}

                <View
                    style={{
                        borderBottomColor: '#EDEDED',
                        borderBottomWidth: 1,
                        marginTop: calcHeight(3)
                    }}
                />
            </View>

        )
    }

    getDatas = () => {
        fetch(`https://gh-trending-api.herokuapp.com/repositories`, {
            method: "GET",
            headers: {
                accept: "application/json"
            },
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201)
                    return response.json();
            })
            .then((response) => {
                response
                    ? this.setState(() => ({
                        datas: response,
                        loading: false,
                    }))
                    : {};
            })
            .catch((error) => {
                console.log("Error");
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#000000", fontSize: 25, fontWeight: "600", textAlign: "center", marginTop: calcHeight(2), marginBottom: calcHeight(1), marginLeft: calcWidth(36) }}>Trending</Text>
                        <View>
                            <TouchableOpacity >
                                <ImageBackground
                                    style={{ height: calcHeight(3), width: calcWidth(5), marginTop: calcHeight(4), marginRight: calcHeight(1) }}
                                    imageStyle={{ borderRadius: 100 }}
                                    source={require("../../Assets/images/more.png")}
                                >
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#EDEDED',
                            borderBottomWidth: 1,
                            marginTop: calcHeight(2)
                        }}
                    />
                </View>
                <View style={{ marginBottom: calcHeight(9) }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {this.state.loading ? (
                            <ActivityIndicator
                                style={{ marginTop: 100, marginBottom: 100 }}
                                size="large"
                                color="0000ff"
                            />
                        ) : this.state.datas.length === 0 ? (
                            <View
                                style={{
                                    height: 200,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: 22,
                                    }}
                                >
                                    Somethings went wrong...
                                </Text>
                            </View>
                        ) : (
                            this.state.datas.map((data) => this.showTrendingRepo(data))
                        )}
                    </ScrollView>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flex: 3,
        backgroundColor: "#F5F6FA",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    footer: {
        flex: 1.5,
    },
    centerAlign: {
        justifyContent: "center",
        alignItems: "center",
    },
    text1: {
        fontFamily: "Manrope-ExtraBold",
        fontSize: 20,
        textAlign: "center",
    },
    text2: {
        fontFamily: "Manrope",
        fontSize: 16,
        textAlign: "center",
    },
});

export default Home;