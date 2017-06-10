const WebStore = require('rdf-store-web')
const rdf = require('rdf-ext')

class SimpleRDFStore {
  init (context, iri, graph, options) {
    this._options.store = options.store || new WebStore()
  }

  get (iri, options) {
    if (typeof iri !== 'string') {
      options = iri
      iri = null
    }

    if (iri) {
      this.iri(iri)
    }

    return rdf.dataset().import(this._options.store.match(null, null, null, this._core.iri, options)).then((graph) => {
      this.graph(graph)

      return this
    })
  }

  save (iri, options) {
    if (typeof iri !== 'string') {
      options = iri
      iri = null
    }

    if (iri) {
      this.iri(iri)
    }

    // assign IRI to the graph of all quads
    let dataset = rdf.dataset(this._core.graph, this._core.iri)

    return rdf.waitFor(this._options.store.import(dataset.toStream()))
  }
}

module.exports = SimpleRDFStore
