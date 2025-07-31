# Influenza Sequence Analyzer

This project analyzes influenza virus sequences from FASTA files to track specific genetic markers.

## Functionality

The primary script, `2024_05_10_GISIAD_Sorter.py`, performs the following actions:

1.  **Parses FASTA Files:** Reads `.fasta` files located in the `Analyzed/` directory.
2.  **Extracts Metadata:** Parses filenames to extract metadata such as:
    *   Year of collection
    *   Host species (e.g., Avian, Mammal, Human)
    *   Geographic location
3.  **Analyzes Amino Acid Mutations:** Inspects each sequence at a specific position (default is 108) to identify the presence of key amino acids, specifically Valine (V) or Isoleucine (I).
4.  **Aggregates Data:** For each file, it counts:
    *   The total number of sequences.
    *   The number of sequences containing Valine (V) at the target position.
    *   The number of sequences containing Isoleucine (I) at the target position.
5.  **Generates CSV Report:** Compiles the aggregated data into a single `output.csv` file for further analysis. The report includes columns for Year, Species, Location, Total Sequences, Valine Count, and Isoleucine Count.

## How to Use

1.  Place your FASTA files in the `Analyzed/` directory. The filenames must follow a specific format for metadata extraction (e.g., `H5N1_Avian_2024_NorthAmerica.fasta`).
2.  Run the `2024_05_10_GISIAD_Sorter.py` script.
3.  The results will be saved in `output.csv`.
