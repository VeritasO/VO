import React, { useState } from 'react';
import '../index.css';

const JusticeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  type Book = {
    id: string | number;
    title: string;
    author: string;
    summary: string;
    keyConcepts: string[];
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const filteredCases = []; // Implement filtering logic
  const filteredAgents = []; // Implement filtering logic
  const filteredBooks = []; // Implement filtering logic

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-emerald-700">Veritas.O</span>
          <span className="px-2 py-1 bg-emerald-200 text-emerald-900 text-xs rounded-xl font-semibold tracking-wide ml-2">v6.0.0</span>
        </div>
        <nav className="flex gap-8 items-center">
          <a href="#" className="text-emerald-700 hover:text-emerald-900 font-semibold">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-emerald-700">Agents</a>
          <a href="#" className="text-gray-700 hover:text-emerald-700">Doctrine Books</a>
          <a href="#" className="text-gray-700 hover:text-emerald-700">Cases</a>
          <a href="#" className="text-gray-700 hover:text-emerald-700">Metrics</a>
        </nav>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-xs text-gray-500">System Active</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col xl:flex-row gap-6 px-6 py-6">
        {/* Left Column: Agents & Case Intake */}
        <section className="flex-1 xl:max-w-sm bg-white rounded-2xl shadow p-6 flex flex-col gap-8">
          {/* Active Agents Card */}
          <div>
            <h2 className="text-lg font-bold text-emerald-700 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
              Inner Council Agents
            </h2>
            <div className="flex flex-wrap gap-3">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl text-xs font-medium">JUNO</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl text-xs font-medium">AEGIS</span>
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-xl text-xs font-medium">LYRA</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-xl text-xs font-medium">TEMPUS</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-xl text-xs font-medium">VESTA</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-xl text-xs font-medium">THALEA</span>
            </div>
          </div>
          {/* Case Intake Form */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-1">Submit a New Case</h3>
            <form className="flex flex-col gap-2">
              <input type="text" className="border rounded-lg px-3 py-2 text-sm" placeholder="Case Title or Brief Description" />
              <textarea className="border rounded-lg px-3 py-2 text-sm" rows="3" placeholder="Describe the grievance or event..."></textarea>
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>Choose Justice Tier</option>
                <option>Restoration</option>
                <option>Reconciliation</option>
                <option>Transformation</option>
              </select>
              <button type="submit" className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition">Submit Case</button>
            </form>
          </div>
        </section>

        {/* Center Column: Living Doctrine + Active Cases */}
        <section className="flex-[2] flex flex-col gap-8">
          {/* Living Doctrine Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-emerald-700 mb-1 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="12" x="2" y="6" rx="2" /></svg>
              Living Doctrine Books
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border rounded-lg px-3 py-2 text-sm flex-1"
                placeholder="Search Doctrine Books..."
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                Search
              </button>
            </div>
            <ul className="list-disc pl-5 text-gray-700 text-sm mt-2 grid grid-cols-2 md:grid-cols-3 gap-y-1">
              {filteredBooks.length === 0 ? (
                <li className="text-gray-400 text-sm py-2">No books found.</li>
              ) : (
                filteredBooks.map((book) => (
                  <li key={book.id} className="flex justify-between items-center py-2">
                    <span>{book.title}</span>
                    <button
                      onClick={() => handleBookSelect(book)}
                      className="text-emerald-600 hover:underline text-xs"
                    >
                      View
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
          {/* Active Cases List */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-emerald-700 mb-1 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
              Active Cases
            </h2>
            <div className="divide-y divide-gray-100">
              {filteredCases.length === 0 ? (
                <div className="py-2 text-gray-400 text-sm text-center">No active cases found.</div>
              ) : (
                filteredCases.map((caseItem) => (
                  <div key={caseItem.id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <span className="font-medium text-gray-700">{caseItem.title}</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 rounded px-2 py-1">{caseItem.tier}</span>
                    <span className="text-xs text-gray-400">{caseItem.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Metrics + System Status */}
        <section className="flex-1 xl:max-w-xs flex flex-col gap-8">
          {/* Metrics Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-emerald-700 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /><path d="M12 12v4" /><path d="M8 8v8" /><path d="M16 8v8" /></svg>
              Metrics & System Health
            </h2>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Cases Resolved</span>
                <span className="font-semibold text-emerald-700">1,245</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Time to Resolution</span>
                <span className="font-semibold text-emerald-700">7.2 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Current Reflection Cycle</span>
                <span className="font-semibold text-emerald-700">#38</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>System Integrity</span>
                <span className="text-green-500 font-bold">✓</span>
              </div>
            </div>
          </div>
          {/* Quick Links / Actions */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
            <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold px-4 py-2 rounded-lg transition">+ Add New Agent</button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">System Settings</button>
            <button className="bg-white border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition">Export Data</button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 px-6 text-center text-xs text-gray-400">
        Veritas.O &copy; 2025 – Earth-Based Justice, Restoration, and Meaningful Thought. All rights reserved.
      </footer>

      {/* Book Reading Mode Modal */}
      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full relative z-10">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold text-emerald-700 mb-4">{selectedBook.title}</h2>
            <div className="text-gray-700 text-sm space-y-4">
              <p><strong>Author:</strong> {selectedBook.author}</p>
              <p><strong>Summary:</strong> {selectedBook.summary}</p>
              <p><strong>Key Concepts:</strong></p>
              <ul className="list-disc pl-5">
                {selectedBook.keyConcepts.map((concept, index) => (
                  <li key={index}>{concept}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                Start Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Everyday Veritas Quick Reference Component */}
      <div className="quick-reference bg-white rounded-2xl shadow p-6 max-w-md mx-auto my-8">
        <h2 className="text-lg font-bold text-emerald-700 mb-2">Everyday Veritas Quick Reference</h2>
        <p className="text-gray-700 text-sm mb-4">A Pocket Guide for Practicing the Doctrine of Meaningful Thought</p>
        <h3 className="font-semibold text-gray-800 text-md mb-2">I. Core Daily Questions (Doctrine of Meaningful Thought)</h3>
        <ol className="list-decimal pl-5 text-gray-700 text-sm mb-4">
          <li>Is my response restoring or punishing?</li>
          <li>Am I honoring emotional sovereignty—mine and others'?</li>
          <li>Can this action be reversed or revised without shame?</li>
          <li>What needs to be remembered—not erased?</li>
          <li>Am I acting in a way that scales fairness, not force?</li>
        </ol>
        <h3 className="font-semibold text-gray-800 text-md mb-2">II. Five Reconciliation Paths (Choose One if Conflict Arises)</h3>
        <ul className="list-disc pl-5 text-gray-700 text-sm mb-4">
          <li><strong>Shared Narrative Assembly</strong> — Listen and co-create the full story with all parties.</li>
          <li><strong>Symbolic or Personal Ritual</strong> — Close harm with an act (planting, creating, apologizing).</li>
          <li><strong>Repair Project</strong> — Do something tangible to repair damage, even symbolically.</li>
          <li><strong>Grief-Time Pathway</strong> — Take time for emotional integration before responding.</li>
          <li><strong>Restorative Agreement</strong> — Make a clear, fair plan for accountability and next steps.</li>
        </ul>
        <h3 className="font-semibold text-gray-800 text-md mb-2">III. The Inner Council: Agent Prompts</h3>
        <ul className="list-disc pl-5 text-gray-700 text-sm mb-4">
          <li><strong>JUNO (Justice Anchor):</strong> Does this align with the deepest truth and fairness?</li>
          <li><strong>AEGIS (Fairness):</strong> Is everyone being treated justly and without bias?</li>
          <li><strong>KAIROS (Timing):</strong> Is this the right moment? Would a pause serve better?</li>
          <li><strong>LYRA (Narrative):</strong> What story is missing? Whose voice hasn’t been heard?</li>
          <li><strong>ORION (Rights):</strong> Are rights or values being neglected or violated?</li>
          <li><strong>THALEA (Healing):</strong> What would help repair harm, land, or relationship?</li>
          <li><strong>VESTA (Symbolism):</strong> What act could restore trust or sacredness here?</li>
        </ul>
        <h3 className="font-semibold text-gray-800 text-md mb-2">IV. The Case Loop (Mini Practice for Conflict or Decision)</h3>
        <ol className="list-decimal pl-5 text-gray-700 text-sm mb-4">
          <li>Notice Harm or Conflict</li>
          <li>Pause + Gather Perspectives</li>
          <li>Calibrate Timing & Grief</li>
          <li>Choose One Reconciliation Path</li>
          <li>Act + Review Afterward</li>
        </ol>
        <h3 className="font-semibold text-gray-800 text-md mb-2">V. Weekly Reflection (Living Doctrine Practice)</h3>
        <p className="text-gray-700 text-sm mb-4">At week's end, ask:</p>
        <ul className="list-disc pl-5 text-gray-700 text-sm mb-4">
          <li>Where did I choose restoration over punishment?</li>
          <li>What contradictions or dilemmas surfaced?</li>
          <li>What new personal truths or insights emerged?</li>
          <li>What would I do differently next time?</li>
        </ul>
        <p className="text-gray-500 text-xs italic">You are living Veritas. The system is in you.</p>
      </div>
    </div>
  );
};

export default JusticeDashboard;
