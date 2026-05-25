// Footer with student credits — required by the project brief.
export function SiteFooter() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-card text-primary font-bold">LCU</div>
            <div>
              <div className="font-semibold">Smart Internship System</div>
              <div className="text-sm text-pink">Lead City University</div>
            </div>
          </div>
          <p className="mt-6 text-sm font-semibold opacity-90">
            SMART INTERNSHIP SYSTEM USING SKILL MATCHING ALGORITHMS
          </p>
          <p className="mt-2 text-sm opacity-80">Developed by: Asake OLAOLUWA Ayomide</p>
          <p className="text-sm opacity-80">Matric No: LCU/UG/22/21894</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide">STAY UPDATED</h3>
          <p className="mt-3 text-sm opacity-80">
            Get notified about new internship opportunities matching your skills.
          </p>
          <form className="mt-5 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md bg-card text-foreground px-4 py-2 text-sm outline-none"
            />
            <button className="rounded-md bg-pink text-pink-foreground px-5 py-2 text-sm font-semibold hover:opacity-90">
              Subscribe for Updates
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-6 py-4 text-xs flex flex-col md:flex-row justify-between gap-2 opacity-80">
          <span>© 2026 Smart Internship System | Lead City University. All rights reserved.</span>
          <span>Made with ♥ at Lead City University, Ibadan</span>
        </div>
      </div>
    </footer>
  );
}
