package main

import (
	"fmt"
	"io"
	"net/http"
	"websocket"
)

var port int = 1234

func echoServer(ws *websocket.Conn) {
	fmt.Printf("copyServer %#v\n", ws.Config())
	io.Copy(ws, ws)
	fmt.Println("copyServer finished")
}

func MainServer(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, fmt.Sprintf(`<html>
		<script>var ws = null; (ws = new WebSocket("ws://localhost:%d/ws")).onopen = function(){console.log("OPENED")};</script>
		</html>`, port))
}

func main() {
	startMessage()

	http.Handle("/ws", websocket.Handler(echoServer))
	http.HandleFunc("/", MainServer)

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}

func startMessage() {
	println(" _____        _ _ _     _   _____         _       _   ")
	println("|   __|___   | | | |___| |_|   __|___ ___| |_ ___| |_ ")
	println("|  |  | . |  | | | | -_| . |__   | . |  _| '_| -_|  _|")
	println("|_____|___|  |_____|___|___|_____|___|___|_,_|___|_|  ")
	println("_________________________________________________test_")
}
