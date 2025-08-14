import React from "react";
import { doctrine } from "../doctrine/library";

export function BookLibrary() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Doctrinal Library</h2>
        <div className="text-sm text-gray-600">
          Version {doctrine.version} • {doctrine.books.length} books • {doctrine.codifications.length} codifications
        </div>
      </div>
      
      <div className="grid gap-4 mb-8">
        {doctrine.books.map((book) => (
          <div key={book.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                book.status === "active" ? "bg-green-100 text-green-800" :
                book.status === "draft" ? "bg-yellow-100 text-yellow-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {book.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{book.description}</p>
            <div className="text-xs text-gray-500">
              Chapters: {book.chapters.join(" • ")}
            </div>
          </div>
        ))}
      </div>
      
      {doctrine.codifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Codifications</h3>
          <div className="space-y-2">
            {doctrine.codifications.slice(-5).map((codification, index) => (
              <div key={index} className="text-sm bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                {codification}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
