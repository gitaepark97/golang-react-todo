package router

import (
	"github.com/gitaepark/golang-react-todo/controller"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/api/task", controller.GetAllTasks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", controller.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/task/{id}", controller.TaskComplete).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/undoTask/{id}", controller.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteTask/{id}", controller.DeleteTask).Methods("PUT", "OPTIONS")

	return router
}