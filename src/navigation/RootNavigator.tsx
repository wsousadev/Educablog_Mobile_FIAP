import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import AdminDrawerNavigator from "./AdminDrawerNavigator";
import LoginScreen from "../screens/Auth/LoginScreen";
import PostsListScreen from "../screens/Posts/PostsListScreen";
import PostReadScreen from "../screens/Posts/PostReadScreen";
import { Feather } from "@expo/vector-icons";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const PostsStack = createNativeStackNavigator();

function PostsStackNav() {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        name="PostsList"
        component={PostsListScreen}
        options={{ title: "Feed de Postagens" }}
      />
      <PostsStack.Screen
        name="PostRead"
        component={PostReadScreen}
        options={{ title: "Post" }}
      />
    </PostsStack.Navigator>
  );
}

function AppTabs() {
  const { role } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          if (route.name === "Posts") {
            return <Feather name="home" size={size} color={color} />;
          }

          if (route.name === "Admin") {
            return <Feather name="settings" size={size} color={color} />;
          }

          return null;
        },

        tabBarActiveTintColor: "#7a1e2b",
        tabBarInactiveTintColor: "#999",

        tabBarShowLabel: false,

        tabBarStyle: {
          height: 64,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: "rgba(0,0,0,0.08)",
          backgroundColor: "#fff",
        },
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsStackNav}
        options={{ title: "Posts" }}
      />

      {role === "PROFESSOR" && (
        <Tab.Screen name="Admin" component={AdminDrawerNavigator} />
      )}
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <RootStack.Screen name="App" component={AppTabs} />
        ) : (
          <RootStack.Screen name="Auth" component={LoginScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
