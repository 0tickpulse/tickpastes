import { Paste } from "@prisma/client";
import { Highlight } from "mythic-language-server/out/colors.js";
import { globalData } from "mythic-language-server/out/documentManager";
import { CachedMythicSkill } from "mythic-language-server/out/mythicModels.js";
import { DocumentInfo, RangeLink } from "mythic-language-server/out/yaml/parser/documentInfo.js";
import { Diagnostic } from "vscode-languageserver";

/**
 * A fake Map implementation that does nothing.
 * This is used to override the default Map implementation in the documentManager.
 * Hopefully a better solution will be found in the future.
 */
class FakeMap<K, V> implements Map<K, V> {
    clear(): void {
        // nothing lmao
    }
    delete(key: K): boolean {
        return false;
    }
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        // nothing
    }
    get(key: K): V | undefined {
        return undefined;
    }
    has(key: K): boolean {
        return false;
    }
    set(key: K, value: V): this {
        return this;
    }
    size = 0;
    entries(): IterableIterator<[K, V]> {
        return new Map().entries();
    }
    keys(): IterableIterator<K> {
        return new Map().keys();
    }
    values(): IterableIterator<V> {
        return new Map().values();
    }
    *[Symbol.iterator](): IterableIterator<[K, V]> {}
    [Symbol.toStringTag]: string = "Map";
}

export class FakeDocumentInfo extends DocumentInfo {
    override addError(_: Diagnostic) {
        // nothing again
    }
    override addGotoDefinitionAndReverseReference(definition: RangeLink): void {
        if (definition.targetDoc !== this) {
            return;
        }
        super.addGotoDefinitionAndReverseReference(definition);
    }
}

export function overrideGlobalData() {
    globalData.documents = {
        manager: globalData.documents.manager,
        list: new FakeMap(),
        getDocument(_) {
            return undefined;
        },
        set(_) {
            // nothing
        },
        delete(_) {
            // nothing
        },
        all() {
            return [];
        },
    };
    globalData.mythic = {
        skills: {
            add(skill: CachedMythicSkill): void {
                // nothing
            },
            all(): CachedMythicSkill[] {
                return [];
            },
        },
    };
    globalData.flush = (uri) => {
        /* nothing */
    };
}
