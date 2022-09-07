# ElectroShopReact
React Native client for the ElectroShop platform

## Overview

The app is a simple consumer of [ElectroShopAPI](https://electroshopapi.herokuapp.com/swagger) for both WEB and Android platforms. It is platform aware, so it serves always best layout and components for given device. 

<img width="512" alt="iShot_2022-09-07_18 08 44" src="https://user-images.githubusercontent.com/8405055/188929916-d1e0da7b-2e8f-42e0-b653-9c33c3f214fb.png">

<img width="512" alt="iShot_2022-09-07_18 28 36" src="https://user-images.githubusercontent.com/8405055/188931828-3f90e148-9747-4991-8ff5-7065a325ca02.png">

<img width="512" alt="iShot_2022-09-07_18 29 58" src="https://user-images.githubusercontent.com/8405055/188931901-31ca66cd-b780-4365-b6ad-b1f8cbe0f927.png">

<img width="512" alt="iShot_2022-09-07_18 14 56" src="https://user-images.githubusercontent.com/8405055/188929999-2f7311aa-cf34-42ab-9296-9ce9d05f13d3.png">

## Features
* Simple authorization with login
* Listing of products and orders
* Adding and removing products in cart
* Displaying available payment options
* Counting and grouping products in given order

## Framework

The application is based on the [Expo](https://expo.dev) framework to achieve multiplatform runtime. Most of the work is done via react native packages but I have sweetened the UI with external icon, toast and material libraries.

## Tech stack
* Expo
* React Native
* TypeScript (Mostly)
* Babel
