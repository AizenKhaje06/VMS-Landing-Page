"use client"

export function ScienceSection() {
  return (
    <section className="py-16 sm:py-24 bg-card px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
              VOLCANIC SCIENCE
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Why <span className="text-primary">Philippine Volcanic Clay</span> Works Best
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Our volcanic clay is sourced from the pristine volcanic regions of the Philippines, specifically
              formulated for tropical Asian skin. The mineral composition works synergistically with our humid climate.
            </p>

            {/* Key minerals */}
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/20">
                    <span className="text-primary font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Silica-Rich Minerals</h4>
                  <p className="text-foreground/70">Exfoliates gently while extracting deep impurities from pores</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/20">
                    <span className="text-primary font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Iron Oxide Compounds</h4>
                  <p className="text-foreground/70">
                    Detoxifies skin by drawing out environmental pollution and bacteria
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/20">
                    <span className="text-primary font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Trace Minerals</h4>
                  <p className="text-foreground/70">
                    Magnesium, potassium, and calcium nourish skin during the cleansing process
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="rounded-lg bg-background p-6 border border-border/50">
              <h4 className="font-semibold text-foreground mb-4">Volcanic vs Regular Clay</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-foreground/70">Detoxification Power</span>
                  <div className="flex gap-2">
                    <span className="text-primary font-bold">⭐⭐⭐⭐⭐</span>
                    <span className="text-foreground/50">vs ⭐⭐⭐</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-foreground/70">Mineral Content</span>
                  <div className="flex gap-2">
                    <span className="text-primary font-bold">⭐⭐⭐⭐⭐</span>
                    <span className="text-foreground/50">vs ⭐⭐⭐⭐</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground/70">Gentle on Skin</span>
                  <div className="flex gap-2">
                    <span className="text-primary font-bold">⭐⭐⭐⭐</span>
                    <span className="text-foreground/50">vs ⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-lg overflow-hidden bg-background aspect-square border border-border/50 flex items-center justify-center">
            <img
              src="/volcanic-clay-science-ph-minerals.jpg"
              alt="Volcanic Clay Mineral Composition"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Local sourcing callout */}
        <div className="mt-12 p-8 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">From Local Volcanoes, For Filipino Skin</h3>
          <p className="text-foreground/70 text-lg">
            Every batch is sourced from Philippine volcanic regions and formulated specifically for the unique needs of
            tropical, humid climate skin. We support local mining communities while delivering exceptional results.
          </p>
        </div>
      </div>
    </section>
  )
}
