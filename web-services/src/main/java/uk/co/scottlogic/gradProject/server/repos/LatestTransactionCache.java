package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.stereotype.Component;
import uk.co.scottlogic.gradProject.server.repos.documents.Transaction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class LatestTransactionCache {
    private HashMap<String, ArrayList<Transaction>> cache;

    public LatestTransactionCache() {
        this.cache = new HashMap<>();
    }

    public void cache(Transaction transaction) {
        String accountId = transaction.getCustomer().getId();

        if (this.cache.containsKey(accountId)) {
            ArrayList<Transaction> transactions = this.cache.get(accountId);
            transactions.add(transaction);
        } else {
            ArrayList<Transaction> transactions = new ArrayList<>();
            transactions.add(transaction);
            this.cache.put(accountId, transactions);
        }
    }

    public List<Transaction> getTransactions(String id) {
        if (!this.cache.containsKey(id)) {
            this.cache.put(id, new ArrayList<>());
        }
        List<Transaction> transactions = this.cache.get(id);

        return transactions;
    }

    public void clearCache(String id) {
        this.cache.put(id, new ArrayList<>());
    }
}
